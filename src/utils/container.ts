export const createContainer = (id:string) => {
    let container=document.getElementById(id);
    if (container) {
        return container;
    }
    container = document.createElement("div");
    container.setAttribute("id", id);
    document.body.appendChild(container);
    return container;
};