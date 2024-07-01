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
