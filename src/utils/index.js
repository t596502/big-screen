export const debounce = (delay,fn)=>{
    let task
    return function () {
        clearTimeout(task)
        task = setTimeout(()=>{
            fn.apply(this,arguments)
        },delay)
    }
}
