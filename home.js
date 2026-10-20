// Map dots. Organizations are real; amounts on newer entries are illustrative placeholders. 100th Street Bank is fictional.
const MAP_REGIONS=REGIONS;
const REGION_STATES={"New York":"New York & New Jersey","New Jersey":"New York & New Jersey","Connecticut":"New York & New Jersey","District of Columbia":"Greater Washington","Maryland":"Greater Washington","Virginia":"Virginia","Delaware":"Delaware","Louisiana":"Louisiana","Texas":"Texas","Illinois":"Illinois & Midwest"};
const CATS=["Affordable Housing","Financial Well-Being","Racial Equity","Small Business Support","Workforce Development"];
const DOTS=[
// Texas
{o:"The DEC Network + UT Dallas Accelerator",c:"Dallas",m:"Texas",k:"Small Business",p:"12-week accelerator, 12 founders",a:45000},
{o:"Everyone On",c:"Dallas",m:"Texas",k:"Digital Access",p:"Digital literacy classes, laptops to take home",a:null,dx:10,dy:6},
{o:"Merit America",c:"Dallas",m:"Texas",k:"Workforce",p:"Career training and wage gains",a:250000,dx:-10,dy:-6},
{o:"Year Up DFW",c:"Fort Worth",m:"Texas",k:"Mobility",p:"Transportation to internships",a:250000},
{o:"Liftoff Houston (City of Houston)",c:"Houston",m:"Texas",k:"Small Business",p:"Startup business plan competition",a:300000},
{o:"BakerRipley",c:"Houston",m:"Texas",k:"Workforce",p:"Job training and small business coaching",a:200000,dx:10,dy:-8},
{o:"Legacy Community Health",c:"Houston",m:"Texas",k:"Healthcare",p:"Community clinics in underserved neighborhoods",a:150000,dx:-10,dy:8},
{o:"PeopleFund",c:"Austin",m:"Texas",k:"Capital",p:"CDFI loans for Texas small businesses",a:300000},
{o:"LiftFund",c:"San Antonio",m:"Texas",k:"Capital",p:"Microloans and business coaching",a:250000},
{o:"Habitat for Humanity El Paso",c:"El Paso",m:"Texas",k:"Housing",p:"Affordable homeownership",a:100000},
// Louisiana
{o:"Hope Credit Union",c:"New Orleans",m:"Louisiana",k:"Capital",p:"CDFI lending and financial education",a:500000},
{o:"Propeller",c:"New Orleans",m:"Louisiana",k:"Small Business",p:"Incubator for impact-driven founders",a:150000,dx:10,dy:-6},
{o:"Ride New Orleans",c:"New Orleans",m:"Louisiana",k:"Mobility",p:"Transit access for workers",a:75000,dx:-10,dy:-6},
{o:"Build Baton Rouge",c:"Baton Rouge",m:"Louisiana",k:"Housing",p:"Neighborhood housing revitalization",a:200000},
{o:"University of Louisiana at Lafayette",c:"Lafayette",m:"Louisiana",k:"Education",p:"Entrepreneurship scholarships",a:120000},
{o:"Shreveport Green",c:"Shreveport",m:"Louisiana",k:"Workforce",p:"Green jobs training",a:60000},
// Virginia
{o:"Union Kitchen Accelerator",c:"Washington, DC",m:"Greater Washington",k:"Small Business",p:"Food & beverage accelerator: idea to shelf in 180 days",a:null,dx:-2,dy:11},
{o:"Virginia LISC",c:"Richmond",m:"Virginia",k:"Capital",p:"BIPOC Small Business Investment Fund",a:250000,dx:9,dy:-8},
{o:"Metropolitan Business League",c:"Richmond",m:"Virginia",k:"Small Business",p:"Recovery grants for SWaM businesses",a:250000,dx:-9,dy:-8},
{o:"Virginia Community Capital",c:"Richmond",m:"Virginia",k:"Capital",p:"Loan loss reserves and credit enhancement",a:250000,dx:1,dy:12},
{o:"CrossOver Health Center",c:"Richmond",m:"Virginia",k:"Healthcare",p:"Free clinic for uninsured residents",a:120000,dx:12,dy:6},
{o:"Lighthouse Labs",c:"Charlottesville",m:"Virginia",k:"Small Business",p:"Startup accelerator",a:90000},
{o:"Old Dominion University",c:"Norfolk",m:"Virginia",k:"Education",p:"Strome Entrepreneurial Center",a:110000},
// Greater Washington
{o:"Association for Enterprise Opportunity",c:"Washington, DC",m:"Greater Washington",k:"Capital",p:"Grants to Black-owned businesses",a:1200000},
{o:"Per Scholas National Capital Region",c:"Washington, DC",m:"Greater Washington",k:"Workforce",p:"Tech apprenticeships for women",a:250000,dx:-10,dy:4},
{o:"Halcyon",c:"Washington, DC",m:"Greater Washington",k:"Small Business",p:"Accelerator for impact-driven founders",a:100000,dx:6,dy:-10},
{o:"Mary's Center",c:"Silver Spring",m:"Greater Washington",k:"Healthcare",p:"Community health and social services",a:150000},
{o:"Latino Economic Development Center",c:"Arlington, VA",m:"Greater Washington",k:"Housing",p:"Housing counseling and small business loans",a:175000},
{o:"Vehicles for Change",c:"Baltimore",m:"Greater Washington",k:"Mobility",p:"Affordable cars for working families",a:90000},
{o:"Conscious Venture Lab",c:"Baltimore",m:"Greater Washington",k:"Small Business",p:"Accelerator for conscious founders",a:80000,dx:9,dy:-6},
// Delaware
{o:"Delaware State University",c:"Wilmington",m:"Delaware",k:"Education",p:"Wilmington riverfront facility",a:3900000},
{o:"Zip Code Wilmington",c:"Wilmington",m:"Delaware",k:"Workforce",p:"Coding bootcamp for career changers",a:120000,dx:9,dy:-4},
{o:"Westside Family Healthcare",c:"Newark",m:"Delaware",k:"Healthcare",p:"Community health centers",a:100000},
{o:"Habitat for Humanity of New Castle County",c:"Dover",m:"Delaware",k:"Housing",p:"Affordable homeownership",a:90000},
{o:"Georgetown Public Library",c:"Georgetown, DE",m:"Delaware",k:"Digital Access",p:"Wi-Fi hotspots and laptops to lend",a:null},
{o:"Laurel Public Library",c:"Laurel, DE",m:"Delaware",k:"Digital Access",p:"Wi-Fi hotspots and laptops to lend",a:null},
// New York & New Jersey
{o:"Robin Hood",c:"Bronx",m:"New York & New Jersey",k:"Workforce",p:"Skills training for Bronx young adults",a:450000},
{o:"Breaking Ground",c:"New York",m:"New York & New Jersey",k:"Housing",p:"Homelessness to housing",a:250000},
{o:"WSFSSH",c:"New York",m:"New York & New Jersey",k:"Healthcare",p:"Health center in senior housing",a:250000,dx:-9,dy:-6},
{o:"Enterprise Community Partners",c:"New York",m:"New York & New Jersey",k:"Housing",p:"Harlem housing stability",a:250000,dx:2,dy:-11},
{o:"Pursuit",c:"Queens",m:"New York & New Jersey",k:"Workforce",p:"Software engineering training",a:200000},
{o:"Hot Bread Kitchen",c:"Brooklyn",m:"New York & New Jersey",k:"Small Business",p:"Food business incubator",a:120000},
{o:"Rising Tide Capital",c:"Jersey City",m:"New York & New Jersey",k:"Small Business",p:"Community Business Academy",a:150000},
{o:"New Jersey Community Capital",c:"Trenton",m:"New York & New Jersey",k:"Capital",p:"CDFI lending",a:200000},
{o:"Bike New York",c:"Newark, NJ",m:"New York & New Jersey",k:"Mobility",p:"Bike education and commuting",a:50000},
// Illinois & Midwest
{o:"1871",c:"Chicago",m:"Illinois & Midwest",k:"Small Business",p:"Innovation hub and accelerator programs",a:150000},
{o:"Allies for Community Business",c:"Chicago",m:"Illinois & Midwest",k:"Capital",p:"Microloans for Chicago entrepreneurs",a:180000,dx:10,dy:6},
{o:"Chicago Scholars",c:"Riverwoods",m:"Illinois & Midwest",k:"Education",p:"College access and career mentoring",a:100000},
{o:"TechTown Detroit",c:"Detroit",m:"Illinois & Midwest",k:"Small Business",p:"Neighborhood business services",a:110000},
// National
{o:"Learn + Launch Accelerator",c:"Boston",m:"National",k:"Education",p:"Edtech and workforce startup accelerator",a:100000},
{o:"The Enterprise Center",c:"Philadelphia",m:"National",k:"Small Business",p:"Capital and coaching for minority entrepreneurs",a:120000},
{o:"Russell Center for Innovation & Entrepreneurship",c:"Atlanta",m:"National",k:"Small Business",p:"Support for Black entrepreneurs",a:130000},
{o:"Pacific Community Ventures",c:"San Francisco",m:"National",k:"Capital",p:"Small business advising and lending",a:100000},
{o:"LA Cleantech Incubator",c:"Los Angeles",m:"National",k:"Small Business",p:"Cleantech startup support",a:90000},
{o:"WBENC",c:"Washington, DC",m:"National",k:"Small Business",p:"SAGE Advice mentorship for women business owners",a:null,dx:-12,dy:10}];
// v4: more investments across the map. Organizations below are ILLUSTRATIVE placeholders (invented names and amounts).
Object.assign(US_CITY,{"Seattle": [97.7, 46.2], "Tacoma": [93.8, 53.6], "Spokane": [171.0, 63.9], "Portland": [79.4, 90.2], "Eugene": [63.7, 120.4], "Oakland": [37.6, 261.6], "San Jose": [41.2, 273.6], "Fresno": [74.0, 296.6], "Sacramento": [55.6, 248.1], "San Diego": [99.8, 397.4], "Las Vegas": [153.0, 328.1], "Reno": [89.5, 234.6], "Salt Lake City": [228.5, 235.3], "Boise": [170.2, 157.6], "Phoenix": [197.3, 399.7], "Tucson": [213.3, 430.8], "Albuquerque": [302.4, 377.0], "Santa Fe": [316.8, 364.5], "Denver": [342.9, 273.9], "Colorado Springs": [343.8, 294.9], "Billings": [300.6, 130.4], "Cheyenne": [348.7, 242.2], "Fargo": [485.7, 118.5], "Sioux Falls": [486.1, 194.1], "Omaha": [499.2, 246.4], "Wichita": [474.2, 328.0], "Kansas City": [522.8, 295.7], "St. Louis": [599.8, 303.5], "Minneapolis": [541.8, 161.0], "Des Moines": [538.3, 238.4], "Milwaukee": [631.3, 200.1], "Indianapolis": [667.7, 271.7], "Columbus": [721.4, 260.9], "Cleveland": [738.4, 222.8], "Cincinnati": [697.9, 283.8], "Grand Rapids": [668.2, 198.3], "Louisville": [678.4, 305.6], "Nashville": [665.1, 355.1], "Memphis": [607.4, 382.9], "Birmingham": [670.6, 415.3], "Jackson": [609.0, 448.1], "Little Rock": [566.6, 394.2], "Oklahoma City": [470.2, 378.8], "Tulsa": [498.2, 363.5], "Atlanta": [714.9, 405.1], "Savannah": [781.9, 434.2], "Charlotte": [775.4, 362.3], "Raleigh": [812.9, 343.1], "Charleston": [801.3, 414.8], "Columbia": [776.3, 390.7], "Jacksonville": [777.3, 475.2], "Orlando": [788.9, 514.5], "Tampa": [769.5, 530.9], "Miami": [822.8, 572.6], "Pittsburgh": [770.8, 242.2], "Charleston, WV": [750.3, 293.9], "Providence": [906.2, 180.5], "Hartford": [885.9, 187.2], "Burlington": [862.5, 129.0], "Portland, ME": [913.6, 135.0], "Manchester": [898.5, 154.9], "Buffalo": [779.5, 183.8], "Rochester": [798.9, 173.8], "Corpus Christi": [469.8, 553.5], "Lubbock": [388.1, 418.9], "Annapolis": [836.5, 263.8], "Roanoke": [783.8, 313.6]});
const CITY_STATE={"Dallas": "Texas", "Fort Worth": "Texas", "Houston": "Texas", "Austin": "Texas", "San Antonio": "Texas", "El Paso": "Texas", "New Orleans": "Louisiana", "Baton Rouge": "Louisiana", "Lafayette": "Louisiana", "Shreveport": "Louisiana", "Richmond": "Virginia", "Charlottesville": "Virginia", "Norfolk": "Virginia", "Washington, DC": "District of Columbia", "Silver Spring": "Maryland", "Arlington, VA": "Virginia", "Baltimore": "Maryland", "Wilmington": "Delaware", "Newark": "Delaware", "Dover": "Delaware", "Georgetown, DE": "Delaware", "Laurel, DE": "Delaware", "Bronx": "New York", "New York": "New York", "Queens": "New York", "Brooklyn": "New York", "Jersey City": "New Jersey", "Trenton": "New Jersey", "Newark, NJ": "New Jersey", "Chicago": "Illinois", "Riverwoods": "Illinois", "Detroit": "Michigan", "Boston": "Massachusetts", "Philadelphia": "Pennsylvania", "Atlanta": "Georgia", "San Francisco": "California", "Los Angeles": "California", "Denver": "Colorado", "Seattle": "Washington", "Miami": "Florida", "Phoenix": "Arizona", "Hartford": "Connecticut", "Tacoma": "Washington", "Spokane": "Washington", "Portland": "Oregon", "Eugene": "Oregon", "Oakland": "California", "San Jose": "California", "Fresno": "California", "Sacramento": "California", "San Diego": "California", "Las Vegas": "Nevada", "Reno": "Nevada", "Salt Lake City": "Utah", "Boise": "Idaho", "Tucson": "Arizona", "Albuquerque": "New Mexico", "Santa Fe": "New Mexico", "Colorado Springs": "Colorado", "Billings": "Montana", "Cheyenne": "Wyoming", "Fargo": "North Dakota", "Sioux Falls": "South Dakota", "Omaha": "Nebraska", "Wichita": "Kansas", "Kansas City": "Missouri", "St. Louis": "Missouri", "Minneapolis": "Minnesota", "Des Moines": "Iowa", "Milwaukee": "Wisconsin", "Indianapolis": "Indiana", "Columbus": "Ohio", "Cleveland": "Ohio", "Cincinnati": "Ohio", "Grand Rapids": "Michigan", "Louisville": "Kentucky", "Nashville": "Tennessee", "Memphis": "Tennessee", "Birmingham": "Alabama", "Jackson": "Mississippi", "Little Rock": "Arkansas", "Oklahoma City": "Oklahoma", "Tulsa": "Oklahoma", "Savannah": "Georgia", "Charlotte": "North Carolina", "Raleigh": "North Carolina", "Charleston": "South Carolina", "Columbia": "South Carolina", "Jacksonville": "Florida", "Orlando": "Florida", "Tampa": "Florida", "Pittsburgh": "Pennsylvania", "Charleston, WV": "West Virginia", "Providence": "Rhode Island", "Burlington": "Vermont", "Portland, ME": "Maine", "Manchester": "New Hampshire", "Buffalo": "New York", "Rochester": "New York", "Corpus Christi": "Texas", "Lubbock": "Texas", "Annapolis": "Maryland", "Roanoke": "Virginia"};
const STATE_REGION={"Connecticut": "New England", "Maine": "New England", "Massachusetts": "New England", "New Hampshire": "New England", "Rhode Island": "New England", "Vermont": "New England", "New Jersey": "Middle Atlantic", "New York": "Middle Atlantic", "Pennsylvania": "Middle Atlantic", "Illinois": "East North Central", "Indiana": "East North Central", "Michigan": "East North Central", "Ohio": "East North Central", "Wisconsin": "East North Central", "Iowa": "West North Central", "Kansas": "West North Central", "Minnesota": "West North Central", "Missouri": "West North Central", "Nebraska": "West North Central", "North Dakota": "West North Central", "South Dakota": "West North Central", "Delaware": "South Atlantic", "District of Columbia": "South Atlantic", "Florida": "South Atlantic", "Georgia": "South Atlantic", "Maryland": "South Atlantic", "North Carolina": "South Atlantic", "South Carolina": "South Atlantic", "Virginia": "South Atlantic", "West Virginia": "South Atlantic", "Alabama": "East South Central", "Kentucky": "East South Central", "Mississippi": "East South Central", "Tennessee": "East South Central", "Arkansas": "West South Central", "Louisiana": "West South Central", "Oklahoma": "West South Central", "Texas": "West South Central", "Arizona": "Mountain", "Colorado": "Mountain", "Idaho": "Mountain", "Montana": "Mountain", "Nevada": "Mountain", "New Mexico": "Mountain", "Utah": "Mountain", "Wyoming": "Mountain", "Alaska": "Pacific", "California": "Pacific", "Hawaii": "Pacific", "Oregon": "Pacific", "Washington": "Pacific"}; // U.S. Census divisions, as used in the CBP report map
DOTS.push(...[{"o": "Rainier Valley Business Collective", "c": "Seattle", "k": "Small Business", "p": "Accelerator for immigrant-owned businesses", "a": 120000, "x": 1},
{"o": "Hilltop Makers Fund", "c": "Tacoma", "k": "Capital", "p": "Microloans for neighborhood makers", "a": 60000, "x": 1},
{"o": "Inland Northwest Founders Lab", "c": "Spokane", "k": "Small Business", "p": "Rural founder cohort", "a": 50000, "x": 1},
{"o": "Albina Business Studio", "c": "Portland", "k": "Small Business", "p": "Incubator for Black-owned businesses", "a": 110000, "x": 1},
{"o": "Willamette Workforce Partners", "c": "Eugene", "k": "Workforce", "p": "Skilled trades training", "a": 70000, "x": 1},
{"o": "Fruitvale Main Street Fund", "c": "Oakland", "k": "Capital", "p": "Small business recovery loans", "a": 150000, "x": 1},
{"o": "Valley Founders Network", "c": "San Jose", "k": "Small Business", "p": "Accelerator for first-time founders", "a": 90000, "x": 1},
{"o": "Central Valley Ag Enterprise", "c": "Fresno", "k": "Small Business", "p": "Food and ag business incubator", "a": 80000, "x": 1},
{"o": "Capitol Digital Bridge", "c": "Sacramento", "k": "Digital Access", "p": "Laptops and broadband for small shops", "a": 60000, "x": 1},
{"o": "Barrio Logan Business Hub", "c": "San Diego", "k": "Small Business", "p": "Bilingual business coaching", "a": 95000, "x": 1},
{"o": "Southern Nevada Women's Business Center", "c": "Las Vegas", "k": "Small Business", "p": "Women founder cohort", "a": 70000, "x": 1},
{"o": "Truckee Meadows Trades Lab", "c": "Reno", "k": "Workforce", "p": "Apprenticeships for small contractors", "a": 55000, "x": 1},
{"o": "Wasatch Community Ventures", "c": "Salt Lake City", "k": "Capital", "p": "CDFI loans for underserved founders", "a": 100000, "x": 1},
{"o": "Treasure Valley Startup Commons", "c": "Boise", "k": "Small Business", "p": "Main-street accelerator", "a": 50000, "x": 1},
{"o": "Desert Bloom Women's Business Center", "c": "Phoenix", "k": "Small Business", "p": "Women founder cohort", "a": 60000, "x": 1},
{"o": "Sonoran Business Alliance", "c": "Tucson", "k": "Capital", "p": "Microloans for Latino-owned businesses", "a": 65000, "x": 1},
{"o": "Rio Grande Enterprise Center", "c": "Albuquerque", "k": "Small Business", "p": "Native and Latino founder programs", "a": 85000, "x": 1},
{"o": "High Desert Housing Partners", "c": "Santa Fe", "k": "Housing", "p": "Affordable rental housing", "a": 70000, "x": 1},
{"o": "Five Points Growth Lab", "c": "Denver", "k": "Small Business", "p": "Main-street accelerator", "a": 50000, "x": 1},
{"o": "Pikes Peak Veteran Founders", "c": "Colorado Springs", "k": "Small Business", "p": "Veteran-owned business cohort", "a": 60000, "x": 1},
{"o": "Big Sky Rural Business Fund", "c": "Billings", "k": "Capital", "p": "Rural small business loans", "a": 55000, "x": 1},
{"o": "High Plains Trades Academy", "c": "Cheyenne", "k": "Workforce", "p": "Trades training", "a": 40000, "x": 1},
{"o": "Red River Startup Studio", "c": "Fargo", "k": "Small Business", "p": "Early-stage accelerator", "a": 50000, "x": 1},
{"o": "Prairie Main Street Partners", "c": "Sioux Falls", "k": "Small Business", "p": "Storefront grants", "a": 45000, "x": 1},
{"o": "North Omaha Business Lab", "c": "Omaha", "k": "Small Business", "p": "Accelerator for Black founders", "a": 90000, "x": 1},
{"o": "Air Capital Makers Fund", "c": "Wichita", "k": "Capital", "p": "Equipment loans for manufacturers", "a": 70000, "x": 1},
{"o": "18th & Vine Founders Collective", "c": "Kansas City", "k": "Small Business", "p": "Incubator for creative businesses", "a": 100000, "x": 1},
{"o": "Gateway Neighborhood Ventures", "c": "St. Louis", "k": "Capital", "p": "CDFI lending", "a": 120000, "x": 1},
{"o": "Lake Street Rebuild Fund", "c": "Minneapolis", "k": "Small Business", "p": "Recovery grants for corridor businesses", "a": 130000, "x": 1},
{"o": "Heartland Digital Futures", "c": "Des Moines", "k": "Digital Access", "p": "Digital skills for small business owners", "a": 50000, "x": 1},
{"o": "Bronzeville Business Studio", "c": "Milwaukee", "k": "Small Business", "p": "Incubator for Black-owned businesses", "a": 95000, "x": 1},
{"o": "Circle City Founders Fund", "c": "Indianapolis", "k": "Capital", "p": "Seed grants and microloans", "a": 80000, "x": 1},
{"o": "Near East Side Business Hub", "c": "Columbus", "k": "Small Business", "p": "Coaching and procurement readiness", "a": 90000, "x": 1},
{"o": "Lake Erie Workforce Alliance", "c": "Cleveland", "k": "Workforce", "p": "Manufacturing career pathways", "a": 110000, "x": 1},
{"o": "Over-the-Rhine Kitchen Incubator", "c": "Cincinnati", "k": "Small Business", "p": "Shared kitchen for food startups", "a": 70000, "x": 1},
{"o": "Grand River Makers Lab", "c": "Grand Rapids", "k": "Small Business", "p": "Maker and manufacturing cohort", "a": 60000, "x": 1},
{"o": "West End Opportunity Partners", "c": "Louisville", "k": "Capital", "p": "Small business loans", "a": 85000, "x": 1},
{"o": "Music City Main Street Lab", "c": "Nashville", "k": "Small Business", "p": "Creative business accelerator", "a": 90000, "x": 1},
{"o": "Soulsville Business Collective", "c": "Memphis", "k": "Small Business", "p": "Accelerator for Black founders", "a": 100000, "x": 1},
{"o": "Magic City Founders Network", "c": "Birmingham", "k": "Small Business", "p": "Early-stage cohort", "a": 70000, "x": 1},
{"o": "Delta Enterprise Fund", "c": "Jackson", "k": "Capital", "p": "CDFI lending in the Delta", "a": 90000, "x": 1},
{"o": "Natural State Business Studio", "c": "Little Rock", "k": "Small Business", "p": "Rural founder accelerator", "a": 60000, "x": 1},
{"o": "Plaza District Business Lab", "c": "Oklahoma City", "k": "Small Business", "p": "Main-street accelerator", "a": 60000, "x": 1},
{"o": "Greenwood Founders Fund", "c": "Tulsa", "k": "Capital", "p": "Grants for Black-owned businesses", "a": 120000, "x": 1},
{"o": "Sweet Auburn Business Studio", "c": "Atlanta", "k": "Small Business", "p": "Accelerator for Black founders", "a": 130000, "x": 1},
{"o": "Coastal Georgia Trades Center", "c": "Savannah", "k": "Workforce", "p": "Port and logistics careers", "a": 60000, "x": 1},
{"o": "Queen City Capital Partners", "c": "Charlotte", "k": "Capital", "p": "Small business lending", "a": 110000, "x": 1},
{"o": "Triangle Inclusive Ventures", "c": "Raleigh", "k": "Small Business", "p": "Tech founder accelerator", "a": 90000, "x": 1},
{"o": "Lowcountry Makers Collective", "c": "Charleston", "k": "Small Business", "p": "Food and craft incubator", "a": 60000, "x": 1},
{"o": "Midlands Digital Access Project", "c": "Columbia", "k": "Digital Access", "p": "Broadband and laptops", "a": 45000, "x": 1},
{"o": "Little Havana Emprende", "c": "Miami", "k": "Small Business", "p": "Bilingual small business program", "a": 80000, "x": 1},
{"o": "Appalachian Enterprise Partners", "c": "Charleston, WV", "k": "Capital", "p": "Rural small business loans", "a": 65000, "x": 1},
{"o": "Ocean State Makers Fund", "c": "Providence", "k": "Small Business", "p": "Maker grants", "a": 50000, "x": 1},
{"o": "Capitol Region Business Collective", "c": "Hartford", "k": "Small Business", "p": "Coaching for Hartford founders", "a": 80000, "x": 1},
{"o": "Green Mountain Main Street", "c": "Burlington", "k": "Small Business", "p": "Rural storefront grants", "a": 40000, "x": 1},
{"o": "Casco Bay Business Studio", "c": "Portland, ME", "k": "Small Business", "p": "Immigrant founder cohort", "a": 50000, "x": 1},
{"o": "Granite State Trades Lab", "c": "Manchester", "k": "Workforce", "p": "Trades apprenticeships", "a": 45000, "x": 1}]);
DOTS.forEach(d=>{d.s=CITY_STATE[d.c];d.m=STATE_REGION[d.s]||d.m});
// v6: 13 randomly chosen states with no funded organizations (no dot, no fill).
const NODOT=new Set(["Arizona","Arkansas","Connecticut","Florida","Idaho","Kentucky","Michigan","Missouri","New Hampshire","South Carolina","South Dakota","Tennessee","Vermont"]);
for(let i=DOTS.length-1;i>=0;i--)if(NODOT.has(DOTS[i].s))DOTS.splice(i,1);
// v5 function areas
const KMAP={"Small Business":"Small Business Support","Capital":"Small Business Support","Workforce":"Workforce Development","Education":"Workforce Development","Mobility":"Workforce Development","Housing":"Affordable Housing","Healthcare":"Financial Well-Being","Digital Access":"Financial Well-Being"};
DOTS.forEach(d=>{d.k=/black|bipoc|minority|immigrant|latin|equity|diverse|women/i.test(d.o+" "+d.p)?"Racial Equity":(KMAP[d.k]||d.k)});
const fmt=a=>a==null?"Amount not disclosed":a>=1e6?"$"+(a/1e6).toFixed(2).replace(/\.?0+$/,"")+"M":"$"+(a/1e3).toFixed(0)+"K";
const MAPREG=REGIONS;
// Region view by default; zoom in (wheel, +, or click a region) to see every city dot.
function drawMap(){
 const svg=document.getElementById("usmap"),tip=document.getElementById("tip"),W=975,H=610;
 const dotted=new Set(DOTS.map(d=>d.s));
 const states=US_STATES.map(s=>`<path class="${dotted.has(s.n)?"fp":""}" data-r="${STATE_REGION[s.n]||""}" d="${s.d}"><title>${s.n}${STATE_REGION[s.n]?" · "+STATE_REGION[s.n]:""}</title></path>`).join("");
 svg.innerHTML=`<g class="st">${states}</g><g id="rg"></g><g id="dots"></g>`;
 const g=svg.querySelector("#dots"),rgG=svg.querySelector("#rg");let R="All",K="All",V={x:0,y:0,w:W};
 const DETAIL=0,zoom=()=>W/V.w;
 const setV=(x,y,w)=>{w=Math.max(W/8,Math.min(W,w));const h=w*H/W;V={x:Math.max(0,Math.min(W-w,x)),y:Math.max(0,Math.min(H-h,y)),w};svg.setAttribute("viewBox",`${V.x} ${V.y} ${w} ${h}`);render()};
 const fit=list=>{if(!list.length)return setV(0,0,W);const xs=list.map(d=>US_CITY[d.c][0]),ys=list.map(d=>US_CITY[d.c][1]);let x0=Math.min(...xs),x1=Math.max(...xs),y0=Math.min(...ys),y1=Math.max(...ys);
  let w=Math.max(x1-x0+80,(y1-y0+80)*W/H,W/4.5);setV((x0+x1)/2-w/2,(y0+y1)/2-w*H/W/2,w)};
 const pos=(d,list)=>{const same=list.filter(e=>e.c==d.c),i=same.indexOf(d),n=same.length,[x,y]=US_CITY[d.c];if(n<2)return[x,y];const r=(6+n*1.5)/Math.sqrt(zoom()),t=2*Math.PI*i/n;return[x+r*Math.cos(t),y+r*Math.sin(t)]};
 const tipAt=(el,html)=>{tip.innerHTML=html;const r=svg.parentNode.getBoundingClientRect(),b=el.getBoundingClientRect();const x=b.left-r.left+b.width/2,y=b.top-r.top;tip.style.display="block";const w=tip.offsetWidth;tip.style.left=Math.max(4,Math.min(r.width-w-4,x-w/2))+"px";tip.style.top=Math.max(4,y-tip.offsetHeight-10)+"px"};
 function render(){const all=DOTS.filter(d=>K=="All"||d.k==K),list=all.filter(d=>R=="All"||d.m==R),z=zoom();
  svg.querySelectorAll(".st path").forEach(p=>p.classList.toggle("hl",R!="All"&&p.dataset.r==R));
  document.getElementById("mapcount").textContent=`${list.length} organizations · ${new Set(list.map(d=>d.c)).size} cities`;
  const em=document.getElementById("mapempty"),lg=document.getElementById("maplegend");const what=K=="All"?"funded organizations":K+" organizations";
  if(!list.length){em.hidden=false;em.innerHTML=`<b>No ${what} in ${R=="All"?"any region":R} yet.</b><span>${all.length?`${all.length} elsewhere, shown in grey. `:""}Try another region or topic.</span>`}else em.hidden=true;
  lg.innerHTML=R=="All"?`<span><i class="lin"></i>Funded organization</span>`:`<span><i class="lin"></i>In ${R} (${list.length})</span><span><i class="lout"></i>Other regions (${all.length-list.length})</span>`;
  document.getElementById("maphint").textContent=z<DETAIL?"":"Pick a region to highlight it. Hover or tap a dot.";
  if(z<DETAIL){g.innerHTML="";const by=MAPREG.map(r=>[r,list.filter(d=>d.m==r)]).filter(x=>x[1].length);
   rgG.innerHTML=by.map(([r,L])=>{const cx=L.reduce((s,d)=>s+US_CITY[d.c][0],0)/L.length,cy=L.reduce((s,d)=>s+US_CITY[d.c][1],0)/L.length,rad=14+Math.sqrt(L.length)*4.5;
    return `<g class="rb" data-r="${r}" tabindex="0"><circle cx="${cx}" cy="${cy}" r="${rad}"/><text x="${cx}" y="${cy+5}" class="n">${L.length}</text><text x="${cx}" y="${cy+rad+15}" class="l">${r}</text></g>`}).join("");
   rgG.querySelectorAll(".rb").forEach(b=>{const L=list.filter(d=>d.m==b.dataset.r),tot=L.reduce((s,d)=>s+(d.a||0),0);
    const show=()=>tipAt(b.querySelector("circle"),`<b>${b.dataset.r}</b><div>${L.length} organizations in ${new Set(L.map(d=>d.c)).size} cities</div><div class="amt">${fmt(tot)}+</div><small>Click to zoom in</small>`);
    b.addEventListener("mouseenter",show);b.addEventListener("focus",show);b.addEventListener("click",e=>{e.stopPropagation();tip.style.display="none";fit(L)})});return}
  rgG.innerHTML="";const r=7/Math.sqrt(z);
  g.innerHTML=all.map(d=>{const [x,y]=pos(d,all);return `<circle class="${R!="All"&&d.m!=R?"dim":R!="All"?"inr":""}" data-i="${DOTS.indexOf(d)}" cx="${x}" cy="${y}" r="${R!="All"&&d.m!=R?r*.6:R!="All"?r*1.25:r}" style="stroke-width:${1.5/Math.sqrt(z)}" tabindex="0"/>`}).join("");
  g.querySelectorAll("circle").forEach(c=>{const show=()=>{const d=DOTS[c.dataset.i];tipAt(c,`<b>${d.o}</b><div>${d.c} · ${d.m}</div><div><span class="tag">${d.k}</span></div><div>${d.p}</div><div class="amt">${fmt(d.a)}</div>`);g.querySelectorAll(".on").forEach(z=>z.classList.remove("on"));c.classList.add("on")};
   c.addEventListener("mouseenter",show);c.addEventListener("focus",show);c.addEventListener("click",e=>{e.stopPropagation();show()})});}
 const pt=e=>{const b=svg.getBoundingClientRect();return[V.x+(e.clientX-b.left)/b.width*V.w,V.y+(e.clientY-b.top)/b.height*V.w*H/W]};
 const zoomAt=(f,cx,cy)=>{const w=V.w/f;setV(cx-(cx-V.x)/f,cy-(cy-V.y)/f,w)};
 let hintT;const mw=svg.parentNode;svg.addEventListener("wheel",e=>{if(!(e.ctrlKey||e.metaKey)){mw.classList.add("showhint");clearTimeout(hintT);hintT=setTimeout(()=>mw.classList.remove("showhint"),1200);return}e.preventDefault();tip.style.display="none";const [x,y]=pt(e);zoomAt(e.deltaY<0?1.15:1/1.15,x,y)},{passive:false});
 let drag=null;svg.addEventListener("pointerdown",e=>{if(zoom()>1.01)drag=[e.clientX,e.clientY,V.x,V.y]});window.addEventListener("pointerup",()=>drag=null);
 svg.addEventListener("pointermove",e=>{if(!drag)return;const b=svg.getBoundingClientRect(),k=V.w/b.width;setV(drag[2]-(e.clientX-drag[0])*k,drag[3]-(e.clientY-drag[1])*k,V.w)});
 const zc=document.getElementById("mapzoom");zc.innerHTML=`<button aria-label="Zoom in">+</button><button aria-label="Zoom out">−</button><button aria-label="Reset">⟲</button>`;
 const [zi,zo,zr]=zc.querySelectorAll("button");zi.onclick=()=>zoomAt(1.6,V.x+V.w/2,V.y+V.w*H/W/2);zo.onclick=()=>zoomAt(1/1.6,V.x+V.w/2,V.y+V.w*H/W/2);zr.onclick=()=>setV(0,0,W);
 svg.parentNode.addEventListener("mouseleave",()=>tip.style.display="none");document.addEventListener("click",()=>tip.style.display="none");
 filters(document.getElementById("mapf"),v=>{R=v;if(v=="All")setV(0,0,W);else setV(0,0,W)},MAPREG);
 filters(document.getElementById("mapc"),v=>{K=v;render()},CATS);
}
// Testimonials: illustrative composites. Names are invented; quotes adapted from public community impact reporting.
const TESTI=[
{n:"Marcus Bell",b:"Co-owner, neighborhood restaurant · Union Kitchen Accelerator, DC",q:"We walked in with a family recipe and walked out with a priced, packaged product on real shelves, and people who actually knew how to get it there.",i:"img/t1.jpg"},
{n:"Lucía Ortega",b:"Founder, translation services firm · Supplier mentorship, Richmond",q:"Asking for help takes courage, but a good mentor helps you see your business in a whole new way.",i:"img/t2.jpg"},
{n:"Andre Collins",b:"Founder, loyalty-tech startup · Accelerator, Dallas",q:"Nonprofits, membership groups and faith-based organizations have some of the biggest direct impact on their communities.",i:"img/t3.jpg"},
{n:"Denise Harper",b:"Digital skills graduate · Houston",q:"I wanted to learn the computer, build presentations and write my own resume to start a business. Now I can, and I got past my anxiety along the way.",i:"img/t4.jpg"},
{n:"",b:"CEO, nonprofit CDFI partner",q:"We meet talented entrepreneurs every day with a clear vision for their business. What’s often missing isn’t ambition, it’s someone willing to believe in that vision and back it with the right capital and support.",i:"img/t6.jpg"}];
const TLOGO=[{w:"Union Kitchen",t:"Food & beverage accelerator"},{w:"100th Street Bank",t:"Supplier mentorship"},{l:"img/logos/dec.png",t:"The DEC Network"},{l:"img/logos/everyoneon.png",t:"Everyone On"},{w:"CDFI partner",t:"CDFI partner"},{l:"img/logos/robinhood.gif",t:"Robin Hood"}];
function renderTesti(el,list=TESTI){const lg=i=>{const L=TLOGO[i]||{};return L.l?`<img class="vlogo" src="${L.l}" alt="${L.t}">`:`<span class="vlogo vwm">${L.w||""}</span>`};
 el.innerHTML=list.map((t,i)=>`<figure class="vcard${t.x?" noph":""}" tabindex="0" data-i="${i}">${t.x?"":`<img class="vph" src="${t.i}" alt="">`}<div class="vbody"><span class="vq">“</span><blockquote>${t.q}</blockquote><figcaption><span>${t.n?`<b>${t.n}</b>`:""}<small>${t.b}</small></span>${t.x?"":lg(i)}</figcaption><span class="vmore">Read their story →</span></div></figure>`).join("");
 const dots=document.getElementById("vdots");dots.innerHTML=list.map((_,i)=>`<button aria-label="Story ${i+1}" class="${i?"":"on"}"></button>`).join("");
 const n=list.length,step=()=>el.querySelector(".vcard").offsetWidth+24,cur=()=>Math.round(el.scrollLeft/step()),to=i=>el.scrollTo({left:((i%n)+n)%n*step(),behavior:"smooth"}),go=d=>to(cur()+d);
 document.getElementById("vprev").onclick=()=>go(-1);document.getElementById("vnext").onclick=()=>go(1);
 dots.querySelectorAll("button").forEach((b,i)=>b.onclick=()=>to(i));
 el.addEventListener("scroll",()=>{const k=cur();dots.querySelectorAll("button").forEach((b,i)=>b.classList.toggle("on",i==k))});
 let sx=null,sl=0;const ds=x=>{sx=x;sl=el.scrollLeft},de=x=>{if(sx==null)return;const dx=x-sx;sx=null;if(Math.abs(dx)<40)return;const atEnd=el.scrollLeft>=el.scrollWidth-el.clientWidth-4&&sl>=el.scrollWidth-el.clientWidth-4,atStart=el.scrollLeft<=4&&sl<=4;
  if(dx<0&&atEnd)to(0);else if(dx>0&&atStart)to(n-1);else if(Math.abs(el.scrollLeft-sl)<10)go(dx<0?1:-1)};
 el.addEventListener("pointerdown",e=>{if(e.pointerType=="mouse")ds(e.clientX)});el.addEventListener("pointerup",e=>{if(e.pointerType=="mouse")de(e.clientX)});
 el.addEventListener("touchstart",e=>ds(e.touches[0].clientX),{passive:true});el.addEventListener("touchend",e=>de(e.changedTouches[0].clientX));
 el.querySelectorAll(".vcard").forEach(c=>c.onclick=()=>{const t=list[c.dataset.i];let m=document.getElementById("vmdl");if(!m){m=document.createElement("div");m.id="vmdl";m.className="vmodal";m.onclick=e=>{if(e.target==m||e.target.classList.contains("vx"))m.style.display="none"};document.body.append(m)}
  m.innerHTML=`<div><button class="vx" aria-label="Close">×</button>${t.x?"":`<img src="${t.i}" alt="">`}<div><span class="vq">“</span><blockquote>${t.q}</blockquote><p>${t.n?`<b>${t.n}</b><br>`:""}<small>${t.b}</small></p><p class="mut">${t.x?"From the Community Benefits Plan interim progress report, Jul–Dec 2025.":"Full story coming soon. (Prototype: illustrative composite.)"}</p></div></div>`;m.style.display="grid"})}
