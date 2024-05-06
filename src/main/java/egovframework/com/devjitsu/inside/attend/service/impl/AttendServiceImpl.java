package egovframework.com.devjitsu.inside.attend.service.impl;

import egovframework.com.devjitsu.g20.repository.PRJRepository;
import egovframework.com.devjitsu.inside.attend.repository.AttendRepository;
import egovframework.com.devjitsu.inside.attend.service.AttendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class AttendServiceImpl implements AttendService {

    @Autowired
    private AttendRepository attendRepository;

    @Autowired
    private PRJRepository prjRepository;

    @Override
    public List<Map<String, Object>> getPersonAttendList(Map<String, Object> params) {
        List<Map<String, Object>> returnList = new ArrayList<>();

        /** CapsData */
        List<Map<String, Object>> g20List = attendRepository.getPersonAttendList(params);

        /** 휴일근로 */
        List<Map<String, Object>> offDayList = new ArrayList<>();

        /** 24년 2월 1일 보다 작을시 구캠스팟 근태 데이터 조회 */
        //int stDt = Integer.parseInt(params.get("startDt").toString().replaceAll("-", ""));
        //if(stDt < 20240201){
        //    offDayList = prjRepository.getOffDayListG20(params);
        //}


        for(Map<String, Object> data : g20List){
            /** 휴일근로 size가 0보다 클 경우 포문 돌려서 데이터 세팅 */
            //if(offDayList.size() > 0){
            //    for(Map<String, Object> subData : offDayList){
            //        if(subData.get("SDate").toString().equals(data.get("START_DATE").toString())){
            //            data.put("HOLIDAY", "휴일근로");
            //        }
            //    }
            //}
            returnList.add(data);
        }

        return returnList;
    }

    @Override
    public Map<String, Object> getPersonHrStatus(Map<String, Object> params) {
        return attendRepository.getPersonHrStatus(params);
    }

    @Override
    public Map<String, Object> getPersonHolidayStatus(Map<String, Object> params) {
        return attendRepository.getPersonHolidayStatus(params);
    }

    @Override
    public List<Map<String, Object>> getPersonAttendStat(Map<String, Object> params) {
        if(!StringUtils.isEmpty(params.get("staffDivision"))){
            String arrText = params.get("staffDivision").toString();

            String[] arr = arrText.split("[|]");
            for(int i = 0; i < arr.length; i++){
                String[] arrL = arr[i].split("&");
                String returnTxt = "(DIVISION IN(" + arrL[0] + ")";
                if(arrL.length > 1){
                    if(!arrL[1].equals("N")){
                        returnTxt += " AND DIVISION_SUB IN(" + arrL[1] + ")";
                    }
                }
                returnTxt += ")";
                arr[i] = returnTxt;
            }
            params.put("arr", arr);
        }
        return attendRepository.getPersonAttendStat(params);
    }

    @Override
    public List<Map<String, Object>> personAnnvMainList(Map<String, Object> params) {
        return attendRepository.personAnnvMainList(params);
    }

    @Override
    public List<Map<String, Object>> getPersonAnnvInfoList(Map<String, Object> params) {
        return attendRepository.getPersonAnnvInfoList(params);
    }

    @Override
    public Map<String, Object> getAttendAllCountMonthly(Map<String, Object> params) {
        return attendRepository.getAttendAllCountMonthly(params);
    }

    @Override
    public List<Map<String, Object>> getAttendDeptCountMonthly(Map<String, Object> params) {
        return attendRepository.getAttendDeptCountMonthly(params);
    }

    @Override
    public List<Map<String, Object>> getAttendPersonalCountMonthly(Map<String, Object> params) {
        return attendRepository.getAttendPersonalCountMonthly(params);
    }

    @Override
    public List<Map<String, Object>> getSubHolidayApplyList(Map<String, Object> params){
        return attendRepository.getSubHolidayApplyList(params);
    }

    @Override
    public List<Map<String, Object>> getHolidayDetailsAdmin(Map<String,Object> params){
        return attendRepository.getHolidayDetailsAdmin(params);
    }

    @Override
    public List<Map<String, Object>> getVacCodeList2(Map<String, Object> params) {
        return attendRepository.getVacCodeList2(params);
    }

    @Override
    public void setHistoryWorkApplyDel(Map<String, Object> params) {
        attendRepository.setHistoryWorkApplyDel(params);
    }

    @Override
    public void setHistoryWorkApplyAdminDel(Map<String, Object> params) {
        attendRepository.setHistoryWorkApplyAdminDel(params);
    }

    @Override
    public List<Map<String, Object>> holidayWorkApplicationList(Map<String, Object> params) {
        return attendRepository.holidayWorkApplicationList(params);
    }
}
