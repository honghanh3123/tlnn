import { apiExam } from "apis/exam"
import { DOMParser } from 'react-native-html-parser';

export const getExams = async () => {
	//call api
	const reponse = await apiExam();
	const parser = new DOMParser();
	result = parser.parseFromString(reponse, "text/html");
	let processExam = [], availabelExam = [];
	let ul = result.getElementsByTagName('ul');
	var length = parseInt(ul.$$length);
	for (var i = 1; i < length; i++) {
		ul = result.getElementsByTagName('ul')[i];
		let li = ul.getElementsByTagName('li');
		var lengthDetail = parseInt(li.length);
		for (var j = 0; j < lengthDetail; j++) {
			li = ul.getElementsByTagName('li')[j];
			let a = li.getElementsByTagName('a')[0];
			if (li.getElementsByTagName('p') && li.getElementsByTagName('p')[1] && li.getElementsByTagName('p')[1].firstChild.data) {
				// bài test đã làm
				availabelExam.push(
					{
						apiQuestion: a.getAttribute('data-launch_url'),
						nameTest: li.getElementsByTagName('h3')[0].firstChild.data,
						timeTest: li.getElementsByTagName('p')[0].firstChild.data,
						attempts: li.getElementsByTagName('p')[1].firstChild.data
					}
				)
			} else {
				if (li.getElementsByTagName('p') && li.getElementsByTagName('p')[0] && li.getElementsByTagName('p')[0].firstChild.data) {
					// bài test đang làm
					processExam.push(
						{
							apiQuestion: a.getAttribute('data-launch_url'),
							nameTest: li.getElementsByTagName('h3')[0].firstChild.data,
							timeTest: li.getElementsByTagName('p')[0].firstChild.data,
							attempts: ""
						}
					)
				} else {
					// bài test chưa làm
					processExam.push(
						{
							apiQuestion: a.getAttribute('data-launch_url'),
							nameTest: li.getElementsByTagName('h3')[0].firstChild.data,
							timeTest: "",
							attempts: ""
						}
					)
				}
			}
		}
	}

	//remove duplicate
	for (var i = 0; i < processExam.length - 1; i++) {
		for (var j = i + 1; j < processExam.length; j++) {
			if (processExam[j].nameTest == processExam[i].nameTest) {
				processExam.splice(j, 1);
				j--;
			}
		}
	}

	//remove duplicate
	for (var i = 0; i < availabelExam.length - 1; i++) {
		for (var j = i + 1; j < availabelExam.length; j++) {
			if (availabelExam[j].nameTest == availabelExam[i].nameTest) {
				availabelExam.splice(j, 1);
				j--;
			}
		}
	}
	return {
		processExam: processExam,
		availabelExam: availabelExam
	}
}
