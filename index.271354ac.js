const e=document.querySelector("#search-form");document.querySelector("searchQuery");e.addEventListener("submit",(function(e){e.preventDefault(),console.log(e.currentTarget.elements.searchQuery.value)})),console.log(e),console.log(e.elements.searchQuery);(async()=>{const e=[1,2,3].map((async o=>{const c=await fetch(`https://jsonplaceholder.typicode.com/users/${o}`);return console.log(e),c.json()})),o=await Promise.all(e);console.log(o)})();
//# sourceMappingURL=index.271354ac.js.map
