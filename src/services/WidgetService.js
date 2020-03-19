export const findWidgetsForTopic = (tid) =>
    fetch(`https://murmuring-inlet-83447.herokuapp.com/api/topics/${tid}/widgets/`)
        .then(response => response.json());
//`https://wbdv-generic-server.herokuapp.com/api/001358744/lesson/${lessonId}/topics`
export const updateWidget = (wid, widget) =>
    fetch(`https://murmuring-inlet-83447.herokuapp.com/api/widgets/${wid}`, {
        method: "PUT",
        body: JSON.stringify(widget),
        headers: {
            'content-type': "application/json"
        }
    }).then(response => response.json());

export const findAllWidgets = () =>
    fetch("https://murmuring-inlet-83447.herokuapp.com/widgets")
        .then(response => response.json())

export const deleteWidget = (widgetId) =>
    fetch(`https://murmuring-inlet-83447.herokuapp.com/api/widgets/${widgetId}`, {
        method: "DELETE"
    }).then(response => response.json());


export const createWidget = (tid, widget) =>
    fetch(`https://murmuring-inlet-83447.herokuapp.com/api/topics/${tid}/widgets`, {
        method: "POST",
        body: JSON.stringify(widget),
        headers: {
            'content-type': "application/json"
        }
    }).then(response => response.json());
