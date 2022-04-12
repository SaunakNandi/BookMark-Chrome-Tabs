let myLeads = []
const inputEl = document.getElementById("input-el")
const SAVE = document.getElementById("SAVE")
const ul = document.getElementById("ul")
const del = document.getElementById("DELETE")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const TAB = document.getElementById("TAB")

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

TAB.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ul.innerHTML = listItems
}

del.addEventListener("click", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

SAVE.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
})