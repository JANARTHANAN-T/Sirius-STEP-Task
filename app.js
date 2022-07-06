const form=document.getElementById('form');
form.addEventListener('click', async function(e){
        e.preventDefault();
        const search=await form.elements.query.value;
        console.log(search);
        const config={params:{q:search},};
        const res=await axios.get(` https://api.tvmaze.com/search/shows`,config);
         makeImages(res.data);
        form.elements.query.value=' ';
})
const makeImages=(shows)=>{
    for(let result of shows){
        if(result.show.image){
        const img=document.createElement('IMG');
        img.src=result.show.image.medium;
        document.body.append(img);
        }
    }
}