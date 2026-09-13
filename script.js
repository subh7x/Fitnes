const $=id=>document.getElementById(id);
const KEY="fitness60_v1";
const defaultIngredients=["rice","dal","milk","banana","oats","peanuts","curd","potato","vegetables","roti"];
const meals=[
 {time:"6:45 AM",name:"Breakfast",base:["oats","milk","banana","peanuts"],alt:"Roti + eggs/paneer + banana",kcal:560,p:20},
 {time:"10:30 AM",name:"Mini meal",base:["banana","milk","peanuts"],alt:"Curd + seasonal fruit + nuts",kcal:300,p:10},
 {time:"1:40 PM",name:"Lunch",base:["rice","dal","potato","vegetables","curd"],alt:"Roti + dal + paneer/chicken + vegetables",kcal:650,p:25},
 {time:"5:30 PM",name:"Pre-workout snack",base:["banana","milk"],alt:"Peanut chikki + fruit + milk",kcal:280,p:10},
 {time:"7:15 PM",name:"Post-workout",base:["milk","banana","peanuts"],alt:"Curd + banana + nuts",kcal:300,p:13},
 {time:"8:30 PM",name:"Dinner",base:["roti","dal","paneer","vegetables"],alt:"Rice + dal + eggs/paneer + vegetables",kcal:560,p:28},
 {time:"11:00 PM",name:"Optional pre-bed",base:["milk"],alt:"Milk + 2 dates",kcal:160,p:7}
];
const exercises=[
 ["Push-ups","3 × 8–12","assets/workout/pushups.jpg","Chest • shoulders • triceps"],
 ["Bodyweight Squats","3 × 10–15","assets/workout/squats.jpg","Legs • glutes"],
 ["Dumbbell Rows","3 × 8–12/side","assets/workout/rows.jpg","Back • biceps"],
 ["Shoulder Press","3 × 8–12","assets/workout/shoulder-press.jpg","Shoulders • triceps"],
 ["Biceps Curls","2 × 10–15","assets/workout/biceps.jpg","Biceps"],
 ["Plank","3 × 20–45 sec","assets/workout/plank.jpg","Core"],
 ["Lunges","2 × 8–12/leg","assets/workout/lunges.jpg","Legs • balance"],
 ["Deadlift","2 × 8–10","assets/workout/deadlift.jpg","Posterior chain — only with safe technique"]
];
function getIngredients(){return $("ingredients").value.toLowerCase().split(",").map(x=>x.trim()).filter(Boolean)}
function matchFood(base, have){return base.filter(x=>have.some(h=>h.includes(x)||x.includes(h)))}
function makeDiet(){
 const have=getIngredients(); const list=$("dietList"); let total=0, protein=0;
 list.innerHTML="";
 meals.forEach(m=>{
   const matched=matchFood(m.base,have.length?have:defaultIngredients);
   const food=matched.length?matched.join(" + "):m.alt;
   total+=m.kcal; protein+=m.p;
   list.insertAdjacentHTML("beforeend",`<article class="meal"><div class="meal-time">${m.time}</div><div><h3>${m.name}</h3><p>${food}</p></div><div class="macro"><b>${m.kcal} kcal</b>${m.p}g protein</div></article>`);
 });
 $("calBadge").textContent=`≈ ${total.toLocaleString()} kcal • ${protein}g protein`;
 save();
}
function renderWorkout(){
 $("workoutList").innerHTML=exercises.map(e=>`<article class="exercise"><img loading="lazy" src="${e[2]}" alt="${e[0]}"><div class="exbody"><h3>${e[0]}</h3><p><b>${e[1]}</b> • ${e[3]}</p></div></article>`).join("");
}
function save(){localStorage.setItem(KEY,JSON.stringify({ingredients:$("ingredients").value,weight:$("weight").value,goal:$("goalWeight").value,theme:document.body.classList.contains("light")}))}
function restore(){try{const x=JSON.parse(localStorage.getItem(KEY)||"{}");if(x.ingredients)$("ingredients").value=x.ingredients;if(x.weight)$("weight").value=x.weight;if(x.goal)$("goalWeight").value=x.goal;if(x.theme)document.body.classList.add("light")}catch(e){}}
function renderHistory(){const h=JSON.parse(localStorage.getItem(KEY+"_history")||"[]");$("history").innerHTML=h.length?h.slice().reverse().map(x=>`<div class="record"><span>Day ${x.day}</span><b>${x.weight} kg</b></div>`).join(""):"<p class='muted'>No weights saved yet.</p>"}
$("makeDiet").onclick=makeDiet;
$("themeBtn").onclick=()=>{document.body.classList.toggle("light");save();$("themeBtn").textContent=document.body.classList.contains("light")?"🌙":"☀️"};
$("restartBtn").onclick=()=>{if(confirm("Clear all saved inputs and progress?")){localStorage.removeItem(KEY);localStorage.removeItem(KEY+"_history");location.reload()}};
$("saveWeight").onclick=()=>{const w=parseFloat($("todayWeight").value),d=parseInt($("dayNum").value);if(!w||!d)return alert("Enter today's weight and day.");const h=JSON.parse(localStorage.getItem(KEY+"_history")||"[]");h.push({day:d,weight:w,date:new Date().toLocaleDateString()});localStorage.setItem(KEY+"_history",JSON.stringify(h));renderHistory()};
restore();makeDiet();renderWorkout();renderHistory();
if("serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("service-worker.js").catch(()=>{}));
