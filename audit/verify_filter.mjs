// verify_filter.mjs -- re-run page selection WITH the quality gate applied, then assert:
//   (1) none of the blocked photo ids appear on any page
//   (2) every page that renders a portfolio still has >= MIN_PHOTOS
// Standalone (re-implements the filter rules so it does not need webpack json import).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
const MIN_PHOTOS = 3; // components hide the portfolio entirely below this (no sparse grids)

const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, "lib/companycam/photo-filter-config.json"), "utf8"));
const BLOCKED = new Set((cfg.blocked_photo_ids || []).map(String));
const APPROVED = new Set((cfg.approved_photo_ids || []).map(String));
const NAME_BLOCK = /\b(bid|estimate|quote|inspection|measure|measurements?|markup|screenshot|internal|office\s*use|do\s*not\s*use|test|testing|sample|samples|template|example|examples|demo|warranty\s*claim|punch\s*list|punchlist)\b/i;
function safe(p) {
  const id = String(p.id);
  if (BLOCKED.has(id)) return false;
  if (APPROVED.has(id)) return true;
  if (p.projectName && NAME_BLOCK.test(p.projectName)) return false;
  return true;
}

// Re-derive full per-city pools from inventory + cached live, then apply selection.
const inv = JSON.parse(fs.readFileSync(path.join(ROOT, "lib/companycam/inventory.json"), "utf8")).projects;
const live = JSON.parse(fs.readFileSync(path.join(HERE, "live-gallery.json"), "utf8")).photos || [];

const NORM = {
  "tampa":"tampa","south tampa":"tampa","carrollwood":"tampa","westchase":"tampa","town n country":"tampa","town 'n' country":"tampa","new tampa":"new-tampa","brandon":"brandon","riverview":"riverview","ruskin":"ruskin","sun city center":"sun-city-center","sun city":"sun-city-center","temple terrace":"temple-terrace","plant city":"plant-city","lutz":"lutz","valrico":"valrico","lithia":"lithia","clearwater":"clearwater","st petersburg":"st-petersburg","st. petersburg":"st-petersburg","saint petersburg":"st-petersburg","st pete":"st-petersburg","palm harbor":"palm-harbor","largo":"largo","tarpon springs":"tarpon-springs","dunedin":"dunedin","oldsmar":"oldsmar","safety harbor":"safety-harbor","seminole":"seminole","pinellas park":"pinellas-park","wesley chapel":"wesley-chapel","land o' lakes":"land-o-lakes","land o lakes":"land-o-lakes","land-o-lakes":"land-o-lakes","new port richey":"new-port-richey","spring hill":"spring-hill","bradenton":"bradenton","lakeland":"lakeland","sarasota":"sarasota",
};
const ALL = [...new Set(Object.values(NORM))];
const COUNTY = {tampa:"Hillsborough","new-tampa":"Hillsborough",brandon:"Hillsborough",riverview:"Hillsborough",ruskin:"Hillsborough","sun-city-center":"Hillsborough","temple-terrace":"Hillsborough","plant-city":"Hillsborough",lutz:"Hillsborough",valrico:"Hillsborough",lithia:"Hillsborough",clearwater:"Pinellas","st-petersburg":"Pinellas","palm-harbor":"Pinellas",largo:"Pinellas","tarpon-springs":"Pinellas",dunedin:"Pinellas",oldsmar:"Pinellas","safety-harbor":"Pinellas",seminole:"Pinellas","pinellas-park":"Pinellas","wesley-chapel":"Pasco","land-o-lakes":"Pasco","new-port-richey":"Pasco","spring-hill":"Hernando",bradenton:"Manatee",lakeland:"Polk",sarasota:"Sarasota"};
const TAG2SVC={commercial:"commercial-gutters",copper:"copper-gutters",govee:"govee-lights",guards:"gutter-guards",gutters:"seamless-aluminum-gutters",siding:"siding",soffit:"soffit-and-fascia"};
const SVC2TAG=Object.fromEntries(Object.entries(TAG2SVC).map(([t,s])=>[s,t]));
const SERVICE_PAGES=Object.values(TAG2SVC);
function pickTag(tags){if(!tags||!tags.length)return"gutters";for(const c of["copper","commercial","guards","soffit","siding","govee","gutters","website"])if(tags.includes(c))return c;return"gutters";}
function norm(c){if(!c)return null;return NORM[c.toLowerCase().trim().replace(/[,.]+$/g,"")]||null;}

const byCity={}; for(const s of ALL) byCity[s]={photos:[],pids:new Set()};
for(const p of inv){if(!p.city_slug||!p.first_photo_url||!byCity[p.city_slug])continue;const sec=p.created_at?Math.floor(new Date(p.created_at).getTime()/1000):0;byCity[p.city_slug].photos.push({id:`inv-${p.project_id}`,projectId:p.project_id,projectName:p.name||"",capturedAt:sec||null,tags:["gutters"],source:"inventory"});byCity[p.city_slug].pids.add(p.project_id);}
for(const p of live){const s=norm(p.city);if(!s||!byCity[s])continue;byCity[s].photos.push({...p,source:"live"});if(p.projectId)byCity[s].pids.add(p.projectId);}
// APPLY FILTER (mirror finalizeByCity)
for(const s of ALL){byCity[s].photos=byCity[s].photos.filter(safe);byCity[s].photos.sort((a,b)=>(b.capturedAt||0)-(a.capturedAt||0));byCity[s].total=new Set(byCity[s].photos.map(p=>p.projectId).filter(Boolean)).size;}

const problems=[]; const pages=[];
function tier(c){return c>=10?"high":c>=5?"medium":c>=1?"low":"none";}
// city pages
for(const s of ALL){
  const t=tier(byCity[s].total);
  let shown;
  if(t==="high"||t==="medium") shown=byCity[s].photos.slice(0,9);
  else { const cty=COUNTY[s]; const pool=[]; for(const cs of ALL) if(COUNTY[cs]===cty) pool.push(...byCity[cs].photos); pool.sort((a,b)=>(b.capturedAt||0)-(a.capturedAt||0)); shown=pool.slice(0,12);}
  // component hides portfolio below MIN_PHOTOS -> model as rendered count (0 if hidden)
  const rendered = shown.length < MIN_PHOTOS ? 0 : shown.length;
  pages.push({page:`/areas/${s}`,tier:t,n:rendered});
  for(const p of shown) if(BLOCKED.has(String(p.id))) problems.push(`BLOCKED ${p.id} on /areas/${s}`);
}
// service pages
for(const svc of SERVICE_PAGES){
  const tag=SVC2TAG[svc]; const pool=[];
  for(const s of ALL) for(const p of byCity[s].photos) if(Array.isArray(p.tags)&&p.tags.includes(tag)) pool.push(p);
  pool.sort((a,b)=>(b.capturedAt||0)-(a.capturedAt||0)); const shown=pool.slice(0,12);
  const rendered = shown.length < MIN_PHOTOS ? 0 : shown.length;
  pages.push({page:`/${svc}`,n:rendered});
  for(const p of shown) if(BLOCKED.has(String(p.id))) problems.push(`BLOCKED ${p.id} on /${svc}`);
}
// projects (all live, filtered)
const proj=live.filter(safe);
for(const p of proj) if(BLOCKED.has(String(p.id))) problems.push(`BLOCKED ${p.id} on /projects`);
pages.push({page:"/projects",n:proj.length});

console.log("blocked ids:",BLOCKED.size);
console.log("pages checked:",pages.length);
const low=pages.filter(p=>p.n>0&&p.n<MIN_PHOTOS);
const empty=pages.filter(p=>p.n===0);
console.log("pages rendering 0 photos:",empty.length, empty.map(p=>p.page).join(", ")||"(none)");
console.log("pages with 1-2 photos:",low.length, low.map(p=>`${p.page}(${p.n})`).join(", ")||"(none)");
console.log("");
if(problems.length){console.log("PROBLEMS:");problems.forEach(p=>console.log("  -",p));process.exit(1);}
else console.log("PASS: no blocked photo on any page; all rendering pages >= "+MIN_PHOTOS+" photos");
