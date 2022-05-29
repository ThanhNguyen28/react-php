
export const formatPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })

export const pageNumber = (data,newsPerPage) => {
    let number=[];
    for ( let i = 1 ; i <= Math.ceil(data.length / newsPerPage) ; i++){
        number.push(i);
    }
    return number;
}

export const findIndex = (data,id) => {
    let temp = -1;
    data.forEach((data,index) => {
        if(data.id===id){
            temp=index;
        }
    });
    return temp;
}