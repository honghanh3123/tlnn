import { apiExam } from "apis/exam"
import { DOMParser } from 'react-native-html-parser';
import { result } from "lodash";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";

export const getExams = async () => {
	try {
		//call api
		const response = await apiExam();
		if (response && response.includes("body")) {
			const parser = new DOMParser();
			let result = parser.parseFromString(response, "text/html");

			let processExam = [], resultData = [], dataExam;
			let ul = result.getElementsByClassName('entry-point-box plain');
			var length = parseInt(ul.$$length);
			if (length == 2) {
				// lưu bài kiểm tra trong tiến trình - processExam
				processExam = saveDataProcessExam(ul, 0);
				// lưu bài kiểm tra có sẵn - availabelExam
				dataExam = saveDataAvailabelExam(ul, 1);
			} else if (length == 1) {
				// lưu bài kiểm tra có sẵn - availabelExam
				dataExam = saveDataAvailabelExam(ul, 0);
			}

			resultData = resultData.concat(processExam)
				.concat(dataExam.availabelExam)
				.concat(dataExam.disableExam);

			return {
				resultData: resultData,
				countProcessExam: processExam.length,
				countAvailabelExam: dataExam.availabelExam.length
			};
		} else {
			alert("Hệ thống đang bảo trì")
		}
	} catch (error) {
		console.log("Lỗi đọc html getExams", error);
	}
}

export const saveDataProcessExam = (ul, index) => {
	let processExam = [];
	const ulProcess = ul[index];
	let li = ulProcess.getElementsByTagName('li');
	var lengthDetail = parseInt(li.length);
	for (var j = 0; j < lengthDetail; j++) {
		li = ulProcess.getElementsByTagName('li')[j];
		let a = li.getElementsByTagName('a')[0];
		processExam.push(
			{
				type: 1,
				apiQuestion: a.getAttribute('data-launch_url'),
				nameTest: li.getElementsByTagName('h3')[0].firstChild.data,
				timeTest: li.getElementsByTagName('p')[0].firstChild.data,
				attempts: ""
			}
		)
	}
	processExam = removeDuplicate(processExam);
	return processExam;
}

export const saveDataAvailabelExam = (ul, index) => {
	let availabelExam = [], disableExam = [];
	const ulProcess = ul[index];
	let li = ulProcess.getElementsByTagName('li');
	var lengthDetail = parseInt(li.length);
	for (var j = 0; j < lengthDetail; j++) {
		li = ulProcess.getElementsByTagName('li')[j];
		let a = li.getElementsByTagName('a')[0];
		let timeTest = "", attempts = "";
		if (li.getElementsByTagName('p') && li.getElementsByTagName('p')[0] && li.getElementsByTagName('p')[0].firstChild.data) {
			timeTest = li.getElementsByTagName('p')[0].firstChild.data;
			timeTest = timeTest.replace("Available from", "Thời gian làm bài từ")
				.replace("to", "đến");
		}

		if (li.getElementsByTagName('p') && li.getElementsByTagName('p')[1] && li.getElementsByTagName('p')[1].firstChild.data) {
			attempts = li.getElementsByTagName('p')[1].firstChild.data;
			if (attempts.includes("Attempts")) {
				attempts = attempts.replace("Attempts", "Số lần đã làm")
					.replace(" of ", "/");
			} else {
				attempts = attempts.replace("Attempt", "Số lần đã làm")
					.replace(" of ", "/");
			}
		}

		if (a.getAttribute('data-launch_url') == "#") {
			disableExam.push(
				{
					type: 3,
					apiQuestion: a.getAttribute('data-launch_url'),
					nameTest: li.getElementsByTagName('h3')[0].firstChild.data,
					timeTest: timeTest,
					attempts: attempts
				}
			)
		} else {
			availabelExam.push(
				{
					type: 2,
					apiQuestion: a.getAttribute('data-launch_url'),
					nameTest: li.getElementsByTagName('h3')[0].firstChild.data,
					timeTest: timeTest,
					attempts: attempts
				}
			)
		}
	}

	availabelExam = removeDuplicate(availabelExam);
	disableExam = removeDuplicate(disableExam);

	return {
		availabelExam: availabelExam,
		disableExam: disableExam
	};
}

export const removeDuplicate = (data) => {
	if (data && data.length > 0) {
		//remove duplicate
		for (var i = 0; i < data.length - 1; i++) {
			for (var j = i + 1; j < data.length; j++) {
				if (data[j].nameTest == data[i].nameTest) {
					data.splice(j, 1);
					j--;
				}
			}
		}
	}
	return data;
}





const serviceBase = async (schemaName, endPoint, params, headers, formData) => {
	try {
		const dataRealm = await read(schemaName);
		if (dataRealm) {
			return dataRealm;
		} else {
			const dataAPI = await callAPIBase(endPoint, method, params, headers, formData);
			const result = handleData(dataAPI); // hàm xử lý dữ liệu trước khi trả về UI System
			await bulkCreate(schemaName, result); // lưu dữ liệu trong Realm Database
			return result;
		}
	} catch (error) {
		console.log("Error", error.response);
	}
}


const callAPIBase = async (endPoint, method, params, headers, formData) => {
	try {
		const cookie = await AsyncStorage.getItem("@cookie");
		let response;
		switch (method) {
			case "POST":
				response = await Axios.post(endPoint, formData, {
					headers: {
						Cookie: cookie,
						...headers
					},
					params: params
				})
				break;
			case "GET":
				response = await Axios.get(endPoint, {
					headers: {
						Cookie: cookie,
						...headers
					},
					params: params
				})
				break;
		}
		return response;
	} catch (error) {
		console.log("Error", error.response);
	}
}