import { useState, useEffect } from "react";

const useListTest = (dataExam, type) => {
  const [loading, setLoading] = useState(true);
  const [dataResource, setDataResource] = useState([]);

  useEffect(() => {
    loadData();
  }, [dataExam]);

  const loadData = () => {
    try {
      let data = [];
      dataExam.map(item => {
        if (item.type == type) {
          data.push(item);
        }
      });
      setDataResource(data);
      setLoading(false);
    } catch (error) {
      console.log("Error loadData doing", error);
    }
  }

  return [loading, dataResource]
}

export default useListTest