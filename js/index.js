document.addEventListener("DOMContentLoaded", function(){
    const submitForm = document.getElementById("github-form")
    submitForm.addEventListener("submit", formSubmitted)




    function formSubmitted(event){
        event.preventDefault();
        let name = document.getElementById("search").value
  
        fetchUsers(name).then(renderUsersFromSearch)
    }


    function fetchUsers(name){
    
        return fetch(`https://api.github.com/search/users?q=${name}`, {
            headers: {
                "Accept": "application/vnd.github.v3+json"
            }
        })
            .then(r => r.json())  
            
    }       


    function renderUsersFromSearch(users){
        const userList = document.getElementById("user-list")
       
        userList.innerHTML = ""
     
        users.items.forEach(user => {
            let li = document.createElement("li")
            let img = document.createElement("img")
            let button = document.createElement("button")
            button.innerText = `View ${user.login}'s Repos`
            button.id = user.repos_url
            li.innerText = user.login
            img.src = user.avatar_url 
            img.width = "50"
            li.append(img, button)
            userList.append(li)
            button.addEventListener("click", showRepos)
        })
    }


    function showRepos(event){
        let userRepoUrl = event.target.id
        const reposList = document.getElementById("repos-list")
        reposList.innerHTML = ""
        console.log(userRepoUrl)
        
        fetch(userRepoUrl, {
            headers: {
                "Accept": "application/vnd.github.v3+json"
            }
        })
            .then(r => r.json())
            .then(repos => {
                
                repos.forEach(repo => {
                    let a = document.createElement("a")
                    let li = document.createElement("li")
                    a.href = repo.html_url 
                    a.innerText = repo.name
                    li.append(a)
                    reposList.append(li)
                    
                })
            })
    }
})