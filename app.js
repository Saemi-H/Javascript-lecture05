
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
  const mapResult = newsFeed.map(item => `<li key=${item.id}><a href="#${item.id}"><h1>${item.title}</h1>(${item.comments_count})</a></li>`)
  document.getElementById("root").innerHTML = `<ul>${mapResult}</ul> 
  <div>
    <a href="#/page${store.currentPage > 1 ? store.currentPage - 1 : 1}">이전페이지</a>
    <a href="#/page${store.currentPage + 1}">다음페이지</a>
  </div>`
  
  
}

const getNewsPage=()=>{
  const id = location.hash.substring(1)
  const results = getData(CONTENT_URL.replace("@id", id))
  document.getElementById("root").innerHTML = ""
  document.getElementById("root").append(container)
  container.innerHTML = `
  <p>${results.title}</p>
  <button>
    <a href="#/page${store.currentPage}">
    목록으로
    </a>
  </button>
  `
}

const getRouter =()=>{
  const route = location.hash
  if(route === ""){
    getNewsFeed()
  }else if(route.indexOf("#/page") >= 0){
    // current page 정의
    store.currentPage = Number(route.substring(7))
    // route 에 #/page 가 변화하는 값이면
    getNewsFeed()
  }
  else{
    getNewsPage()
  }
}

window.addEventListener("hashchange", getRouter)
getRouter()