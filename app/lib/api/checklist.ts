const apiUrl = import.meta.env.VITE_API_URL;

export const getAllChecklist = async (authorization: string) => {
  try {
    const res = await fetch(apiUrl + "/checklist", {
      method: "GET",
      headers: {
        Authorization: authorization,
      },
    });
    return await res.json();
  } catch (error) {
    return error;
  }
};

export const addChecklist = async (name: string, authorization: string) => {
  try {
    const res = await fetch(apiUrl + "/checklist", {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
      },
    });
    return await res.json();
  } catch (error) {
    return error;
  }
};

export const deleteChecklist = async (id: string, authorization: string) => {
  try {
    const res = await fetch(apiUrl + "/checklist/" + id, {
      method: "DELETE",
      headers: {
        Authorization: authorization,
      },
    });
    return await res.json();
  } catch (error) {
    return error;
  }
};

export const getChecklistItems = async (
  checklistId: string,
  authorization: string
) => {
  try {
    const res = await fetch(apiUrl + "/checklist/" + checklistId + "/item", {
      method: "GET",
      headers: {
        Authorization: authorization,
      },
    });
    return await res.json();
  } catch (error) {
    return error;
  }
};

export const addChecklistItem = async (
  data: { checklistId: string; itemName: string },
  authorization: string
) => {
  try {
    const res = await fetch(
      apiUrl + "/checklist/" + data.checklistId + "/item",
      {
        method: "POST",
        body: JSON.stringify({ itemName: data.itemName }),
        headers: {
          "Content-Type": "application/json",
          Authorization: authorization,
        },
      }
    );
    return await res.json();
  } catch (error) {
    return error;
  }
};

export const updateChecklistItemStatus = async (
  data: { checklistId: string; itemId: string },
  authorization: string
) => {
  try {
    const res = await fetch(
      apiUrl + "/checklist/" + data.checklistId + "/item/" + data.itemId,
      {
        method: "PUT",
        headers: {
          Authorization: authorization,
        },
      }
    );
    return await res.json();
  } catch (error) {
    return error;
  }
};

export const deleteChecklistItem = async (
  data: { checklistId: string; itemId: string },
  authorization: string
) => {
  try {
    const res = await fetch(
      apiUrl + "/checklist/" + data.checklistId + "/item/" + data.itemId,
      {
        method: "DELETE",
        headers: {
          Authorization: authorization,
        },
      }
    );
    return await res.json();
  } catch (error) {
    return error;
  }
};

export const renameChecklistItem = async (
  data: { checklistId: string; itemId: string },
  authorization: string
) => {
  try {
    const res = await fetch(
      apiUrl + "/checklist/" + data.checklistId + "/item/rename/" + data.itemId,
      {
        method: "PUT",
        headers: {
          Authorization: authorization,
        },
      }
    );
    return await res.json();
  } catch (error) {
    return error;
  }
};
