import { useEffect, useState } from "react";

function useFetch(url) {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    // GET 요청
    const fetchData =(() => {
        if (!url) return;

        setIsLoading(true);
        fetch(url)
            .then((res) => {
                if (!res.ok) throw new Error("네트워크 오류");
                return res.json();
            })
            .then((result) => setData(result))
            .catch((err) => setError(err.message))
            .finally(() => setIsLoading(false));
    });

    useEffect(() => {
        fetchData();
    }, [url]);

    // POST 요청 (추가
    const postData = async (newData) => {
        try {
            setIsLoading(true);
            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newData),
            });
            const result = await res.json();
            fetchData(); // 자동 새로고침
            return result;
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // PUT 요청 (수정)
    const putData = async (id, updatedData) => {
        try {
            setIsLoading(true);
            const res = await fetch(`${url}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData),
            });
            const result = await res.json();
            fetchData(); // 자동 새로고침
            return result;
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // DELETE 요청
    const deleteData = async (id) => {
        try {
            setIsLoading(true);
            await fetch(`${url}/${id}`, { method: "DELETE" });
            fetchData(); // 자동 새로고침
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        data,
        isLoading,
        error,
        postData,
        putData,
        deleteData,
        refetch: fetchData,
    };
}

export default useFetch;
