const counters = document.querySelectorAll('.counter');




$(window).scroll(function() {    
    var scroll = $(window).scrollTop();    
    if (scroll > 600) {
        const speed = 1000;
        counters.forEach(counter => {
            const updateCount = () => {
                const target=+counter.getAttribute('data-target');
                const count=+counter.innerText;
                const inc= target/speed;     
                if(count<target){
                    counter.innerText = count + inc;
                    setTimeout(updateCount,1);
                }
                else{
                    count.innerText = target;
                }
            }
            updateCount();
        });
}
});