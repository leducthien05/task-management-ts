interface objectSearch {
    keyword: string,
    regex?: RegExp
}

const search = (query: Record<string, any>)=>{
    const objectSearch: objectSearch = {
        keyword: ""
    }
    if(query.keyword){
        objectSearch.keyword = query.keyword;
        const regex = new RegExp(objectSearch.keyword, "i");
        objectSearch.regex = regex;
    }
    return objectSearch;
}

export default search;