export default{
    mounted(el, binding){
        const options = {
            rootMargin: '0px',
            threshold: 0.1
        }
        const callback = (entries) => {
        if(entries[0].isIntersecting){
            binding.value();
            console.log(true)
        }
        else console.log(false)
        //console.log(this.players)
        }
        const observer = new IntersectionObserver(callback, options);
        observer.observe(el);
    },
    name: 'intersection'
}