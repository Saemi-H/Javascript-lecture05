
const ajax = new XMLHttpRequest();
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json' 
const container = document.createElement("div")

// define all shared elements
const store = {
  currentPage: 1,

}

const getData =(url) =>{
  ajax.open('GET',url, false )
  ajax.send()
  return JSON.parse(ajax.response)
}

const getNewsFeed=()=>{
  const newsFeed = getData(NEWS_URL)
  const mapResult = newsFeed.map(item => `<li><a href=#${item.id}><h1>${item.title}</h1>(${item.comments_count})</a></li>`)
  document.getElementById("root").innerHTML = `<ul>${mapResult}</ul>`
}

const getNewsPage=()=>{
  const id = location.hash.substring(1)
  const results = getData(CONTENT_URL.replace("@id", id))
  const goBack=document.createElement("button")
  goBack.innerText = "목록으로"
  document.getElementById("root").innerHTML = ""
  document.getElementById("root").append(container)
  container.append(results.title)
  container.append(goBack)
}

const getRouter =()=>{
  const route = location.hash
  if(route === ""){
    getNewsFeed()
  }else{
    getNewsPage()
  }
}

window.addEventListener("hashchange", getRouter)
getRouter()