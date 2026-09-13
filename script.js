const $=id=>document.getElementById(id);
const meals=[
["6:45 AM","Breakfast",["oats","milk","banana","peanuts"],"Roti + eggs/paneer + banana",560,20],
["10:30 AM","Mini meal",["banana","milk","peanuts"],"Curd + fruit + nuts",300,10],
["1:40 PM","Lunch",["rice","dal","potato","vegetables","curd"],"Roti + dal + paneer/chicken + vegetables",650,25],
["5:30 PM","Pre-workout",["banana","milk"],"Peanut chikki + fruit + milk",280,10],
["7:15 PM","Post-workout",["milk","banana","peanuts"],"Curd + banana + nuts",300,13],
["8:30 PM","Dinner",["roti","dal","paneer","vegetables"],"Rice + dal + eggs/paneer + vegetables",560,28],
["11:00 PM","Optional pre-bed",["milk"],"Milk + 2 dates",160,7]];
const exercises=[
["Push-ups","3 × 8–12","./images/workouts/pushups.jpg","Chest • shoulders • triceps"],
["Bodyweight Squats","3 × 10–15","./images/workouts/squats.jpg","Legs • glutes"],
["Dumbbell Rows","3 × 8–12/side","./images/workouts/rows.jpg","Back • biceps"],
["Shoulder Press","3 × 8–12","./images/workouts/shoulder-press.jpg","Shoulders • triceps"],
["Biceps Curls","2 × 10–15","./images/workouts/biceps.jpg","Biceps"],
["Plank","3 × 20–45 sec","./images/workouts/plank.jpg","Core"],
["Lunges","2 × 8–12/leg","./images/workouts/lunges.jpg","Legs • balance"],
["Deadlift","2 × 8–10","./images/workouts/deadlift.jpg","Posterior chain"]];
function generate(){
 const have=($("ingredients")?.value||"").toLowerCase().split(",").map(x=>x.trim()).filter(Boolean);
 let k=0,p=0;
 $("dietList").innerHTML=meals.map(m=>{
  const f=m[2].filter(x=>have.some(v=>v.includes(x)||x.includes(v)));k+=m[4];p+=m[5];
  return `<article class="meal"><div class="meal-time">${m[0]}</div><div><h3>${m[1]}</h3><p>${f.length?f.join(" + "):m[3]}</p></div><div class="macro"><b>${m[4]} kcal</b>${m[5]}g protein</div></article>`;
 }).join("");
 $("calBadge").textContent=`≈ ${k.toLocaleString()} kcal • ${p}g protein`;
}
$("makeDiet").onclick=generate;
$("restartBtn").onclick=()=>{if(confirm("Clear all saved inputs?")){localStorage.clear();location.reload()}};
$("workoutList").innerHTML=exercises.map(e=>`<article class="exercise"><img src="${e[2]}" alt="${e[0]}" loading="lazy" onerror="this.onerror=null;this.src='./images/app-icon.png'"><div class="exbody"><h3>${e[0]}</h3><p><b>${e[1]}</b> • ${e[3]}</p></div></article>`).join("");
generate();
