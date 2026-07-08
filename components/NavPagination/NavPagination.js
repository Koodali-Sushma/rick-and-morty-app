export function NavPagination(pagination, page, maxPage){
    const navSpan = document.createElement("span");
    pagination.textContent = `${page} / ${maxPage}`;
}