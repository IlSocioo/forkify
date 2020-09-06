
export default class Like{
    constructor(){
        this.likes = [];
    }

    addItem(id, el){
        const like = {
            id,
            title: el.title,
            img: el.image
        };

        this.likes.push(like);
    }

    removeItem(id){
        const removetoRemove = this.likes.findIndex( el => el.id === id);
        this.likes.splice(removetoRemove, 1);
    }

    isLiked(id){
        return this.likes.findIndex( el => el.id === id) !== -1;
    }
}