package egovframework.com.devjitsu.campus.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import dev_jitsu.MainLib;
import egovframework.com.devjitsu.campus.repository.CampusRepository;
import egovframework.com.devjitsu.campus.service.CampusService;
import egovframework.com.devjitsu.common.repository.CommonRepository;
import egovframework.com.devjitsu.gw.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CampusServiceImpl implements CampusService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CampusRepository campusRepository;

    @Autowired
    private CommonRepository commonRepository;

    @Override
    public List<Map<String, Object>> getCodeList(Map<String, Object> params){
        return campusRepository.getCodeList(params);
    }

    @Override
    public Map<String, Object> getCodeOne(Map<String, Object> params){
        return campusRepository.getCodeOne(params);
    }

    @Override
    public Map<String, Object> getRealEduTimeYear(Map<String, Object> params){
        return campusRepository.getRealEduTimeYear(params);
    }

    @Override
    public Map<String, Object> getRealEduTimeStudyWeekly(Map<String, Object> params){
        return campusRepository.getRealEduTimeStudyWeekly(params);
    }

    @Override
    public Map<String, Object> getRealEduTimePropagWeekly(Map<String, Object> params){
        return campusRepository.getRealEduTimePropagWeekly(params);
    }

    @Override
    public List<Map<String, Object>> getEduInfoList(Map<String, Object> params){
        return campusRepository.getEduInfoList(params);
    }

    @Override
    public Map<String, Object> getEduInfoOne(Map<String, Object> params){
        Map<String, Object> result = campusRepository.getEduInfoOne(params);
        result.put("eduFileList", campusRepository.getEduInfoFile(result));
        return result;
    }

    @Override
    public Map<String, Object> getEduResultOne(Map<String, Object> params){
        return campusRepository.getEduResultOne(params);
    }

    @Override
    public List<Map<String, Object>> getStudyInfoStatList(Map<String, Object> params){
        return campusRepository.getStudyInfoStatList(params);
    }

    @Override
    public List<Map<String, Object>> getStudyInfoList(Map<String, Object> params){
        return campusRepository.getStudyInfoList(params);
    }

    @Override
    public Map<String, Object> getStudyInfoOne(Map<String, Object> params){
        return campusRepository.getStudyInfoOne(params);
    }

    @Override
    public List<Map<String, Object>> getStudyUserList(Map<String, Object> params){
        return campusRepository.getStudyUserList(params);
    }

    @Override
    public List<Map<String, Object>> getStudyJournalList(Map<String, Object> params){
        return campusRepository.getStudyJournalList(params);
    }

    @Override
    public Map<String, Object> getStudyJournalOne(Map<String, Object> params){
        return campusRepository.getStudyJournalOne(params);
    }

    @Override
    public List<Map<String, Object>> getStudyPropagList(Map<String, Object> params){
        return campusRepository.getStudyPropagList(params);
    }

    @Override
    public List<Map<String, Object>> getStudyPropagUserList(Map<String, Object> params){
        return campusRepository.getStudyPropagUserList(params);
    }

    @Override
    public List<Map<String, Object>> getOjtPlanList(Map<String, Object> params){
        return campusRepository.getOjtPlanList(params);
    }

    @Override
    public Map<String, Object> getOjtPlanOne(Map<String, Object> params){
        return campusRepository.getOjtPlanOne(params);
    }

    @Override
    public List<Map<String, Object>> getOjtResultList(Map<String, Object> params){
        return campusRepository.getOjtResultList(params);
    }

    @Override
    public Map<String, Object> getOjtResultOne(Map<String, Object> params){
        return campusRepository.getOjtResultOne(params);
    }

    @Override
    public List<Map<String, Object>> getOpenStudyInfoStatList(Map<String, Object> params){
        return campusRepository.getOpenStudyInfoStatList(params);
    }

    @Override
    public List<Map<String, Object>> getOpenStudyInfoList(Map<String, Object> params){
        return campusRepository.getOpenStudyInfoList(params);
    }

    @Override
    public Map<String, Object> getOpenStudyInfoOne(Map<String, Object> params){
        return campusRepository.getOpenStudyInfoOne(params);
    }

    @Override
    public List<Map<String, Object>> getOpenStudyUserList(Map<String, Object> params){
        return campusRepository.getOpenStudyUserList(params);
    }

    @Override
    public List<Map<String, Object>> getCommonEduStatList(Map<String, Object> params){
        return campusRepository.getCommonEduStatList(params);
    }

    @Override
    public List<Map<String, Object>> getCommonEduList(Map<String, Object> params){
        return campusRepository.getCommonEduList(params);
    }

    @Override
    public Map<String, Object> getCommonEduOne(Map<String, Object> params){
        return campusRepository.getCommonEduOne(params);
    }

    @Override
    public List<Map<String, Object>> getCommonEduUserList(Map<String, Object> params){
        return campusRepository.getCommonEduUserList(params);
    }

    @Override
    public List<Map<String, Object>> getCommonEduUserAddList(Map<String, Object> params){
        return campusRepository.getCommonEduUserAddList(params);
    }

    @Override
    public List<Map<String, Object>> getEduStat(Map<String, Object> params){
        return campusRepository.getEduStat(params);
    }

    @Override
    public List<Map<String, Object>> getEduAllStatList(Map<String, Object> params){
        return campusRepository.getEduAllStatList(params);
    }

    @Override
    public List<Map<String, Object>> getTargetYearList(Map<String, Object> params){
        return campusRepository.getTargetYearList(params);
    }

    @Override
    public List<Map<String, Object>> getTargetOne(Map<String, Object> params){
        return campusRepository.getTargetOne(params);
    }

    @Override
    public List<Map<String, Object>> getTargetList(Map<String, Object> params){
        return campusRepository.getTargetList(params);
    }

    @Override
    public Map<String, Object> getEduCategoryOne(Map<String, Object> params){
        return campusRepository.getEduCategoryOne(params);
    }

    @Override
    public List<Map<String, Object>> getEduCategoryList(Map<String, Object> params){
        return campusRepository.getEduCategoryList(params);
    }

    @Override
    public Map<String, Object> getEduCategoryDetailOne(Map<String, Object> params){
        return campusRepository.getEduCategoryDetailOne(params);
    }

    @Override
    public List<Map<String, Object>> getEduCategoryDetailList(Map<String, Object> params){
        return campusRepository.getEduCategoryDetailList(params);
    }

    @Override
    public List<Map<String, Object>> getTargetCategoryList(Map<String, Object> params){
        return campusRepository.getTargetCategoryList(params);
    }

    @Override
    public List<Map<String, Object>> getTargetCategoryDetailList(Map<String, Object> params){
        return campusRepository.getTargetCategoryDetailList(params);
    }

    @Override
    public List<Map<String, Object>> getEduPlanList(Map<String, Object> params){
        return campusRepository.getEduPlanList(params);
    }

    @Override
    public List<Map<String, Object>> getEduPlanOne(Map<String, Object> params){
        return campusRepository.getEduPlanOne(params);
    }

    @Override
    public List<Map<String, Object>> getDutyInfoList(Map<String, Object> params){
        return campusRepository.getDutyInfoList(params);
    }

    @Override
    public Map<String, Object> getDutyInfoOne(Map<String, Object> params){
        return campusRepository.getDutyInfoOne(params);
    }

    @Override
    public List<Map<String, Object>> getDutyInfoMngList(Map<String, Object> params){
        return campusRepository.getDutyInfoMngList(params);
    }





    @Override
    public void setEduInfoInsert(Map<String, Object> params, MultipartHttpServletRequest request, String serverDir, String baseDir) {
        campusRepository.setEduInfoInsert(params);
        params.put("menuCd", "eduReq");

        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        MultipartFile eduFile = request.getFile("eduFile");

        if(eduFile != null){
            if(!eduFile.isEmpty()){
                fileInsMap = mainLib.fileUpload(eduFile, filePath(params, serverDir));
                fileInsMap.put("contentId", "eduInfo_" + params.get("eduInfoId"));
                fileInsMap.put("crmSn", params.get("rsSn"));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, baseDir));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("empSeq"));
                commonRepository.insOneFileInfo(fileInsMap);
            }
        }
    }

    @Override
    public void setEduResultInsert(Map<String, Object> params) {
        campusRepository.setEduInfoUpdate(params);
        campusRepository.setEduResultInsert(params);
    }

    @Override
    public void setMngCheckUpd(Map<String, Object> params) {
        campusRepository.setMngCheckUpd(params);
    }

    @Override
    public void setStudyInfoInsert(Map<String, Object> params) {
        int studyClass = Integer.parseInt(params.get("studyClassSn").toString());
        campusRepository.setStudyInfoInsert(params);

        if(params.get("studyUserSeq") != null && !params.get("studyUserSeq").equals("")){
            String studyUserSeq = params.get("studyUserSeq").toString();
            String[] studyUserSeqArr = studyUserSeq.split(",");

            for(String str: studyUserSeqArr){
                params.put("empSeq", str);
                Map<String, Object> userMap = userRepository.getUserInfo(params);
                params.put("studyEmpName", userMap.get("EMP_NAME_KR"));
                params.put("studyDeptName", userMap.get("deptNm"));
                params.put("studyTeamName", userMap.get("teamNm"));
                params.put("studyPositionName", userMap.get("POSITION_NAME"));
                params.put("studyDutyName", userMap.get("DUTY_NAME"));
                if(studyClass == 2 || studyClass == 3){
                    params.put("studyClassSn", 5);
                    params.put("studyClassText", "학습자");
                }

                campusRepository.setStudyUserInsert(params);
            }
        }

        if((studyClass == 2 || studyClass == 3) && params.get("readerUserSeq") != null && !params.get("readerUserSeq").equals("")){
            String readerUserSeq = params.get("readerUserSeq").toString();
            String[] readerUserSeqArr = readerUserSeq.split(",");

            for(String str: readerUserSeqArr){
                params.put("empSeq", str);
                Map<String, Object> userMap = userRepository.getUserInfo(params);
                params.put("studyEmpName", userMap.get("EMP_NAME_KR"));
                params.put("studyDeptName", userMap.get("deptNm"));
                params.put("studyTeamName", userMap.get("teamNm"));
                params.put("studyPositionName", userMap.get("POSITION_NAME"));
                params.put("studyDutyName", userMap.get("DUTY_NAME"));
                params.put("studyClassSn", 4);
                params.put("studyClassText", "지도자");

                campusRepository.setStudyUserInsert(params);
            }
        }
    }

    @Override
    public void setStudyUserMngUpdate(Map<String, Object> params) {
        campusRepository.setStudyUserMngUpdate(params);
    }

    @Override
    public void studyReq(Map<String, Object> params) {
        campusRepository.studyReq(params);
    }

    @Override
    public void setStudyJournalInsert(Map<String, Object> params, MultipartHttpServletRequest request, String SERVER_DIR, String BASE_DIR) {
        campusRepository.setStudyJournalInsert(params);

        String[] seqArr = params.get("studyEmpSeq").toString().split(",");
        String[] nameArr = params.get("studyEmpName").toString().split(",");

        for(int i = 0 ; i < seqArr.length ; i++){
            params.put("studyEmpSeq", seqArr[i]);
            params.put("studyEmpName", nameArr[i]);
            Map<String, Object> userMap = campusRepository.getStudyUserInfo(params);
            params.put("studyDeptName", userMap.get("STUDY_DEPT_NAME"));
            params.put("studyTeamName", userMap.get("STUDY_TEAM_NAME"));
            params.put("studyPositionName", userMap.get("STUDY_POSITION_NAME"));
            params.put("studyDutyName", userMap.get("STUDY_DUTY_NAME"));
            params.put("studyClassSn", userMap.get("STUDY_CLASS_SN"));
            params.put("studyClassText", userMap.get("STUDY_CLASS_TEXT"));

            campusRepository.setStudyResultUserInsert(params);
        }

        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        MultipartFile files = request.getFile("files");
        params.put("menuCd", "studyJournal");
        if(files != null){
            if(!files.isEmpty()){
                fileInsMap = mainLib.fileUpload(files, filePath(params, SERVER_DIR));
                fileInsMap.put("studyJournalSn", params.get("studyJournalSn"));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("file_no", fileInsMap.get("file_no"));
                campusRepository.setStudyJournalUpdate(fileInsMap);
            }
        }
    }

    private String filePath (Map<String, Object> params, String base_dir){
        LocalDate now = LocalDate.now();
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        String fmtNow = now.format(fmt);

        String path = base_dir + params.get("menuCd").toString()+"/" + fmtNow + "/";

        return path;
    }

    @Override
    public void setStudyJournalApp(Map<String, Object> params) {
        campusRepository.setStudyJournalApp(params);
    }

    @Override
    public void setOjtPlanInsert(Map<String, Object> params) {
        campusRepository.setOjtPlanInsert(params);
    }

    @Override
    public void setOjtPlanUpdate(Map<String, Object> params) {
        campusRepository.setOjtPlanUpdate(params);
    }

    @Override
    public void setStudyResultSc(Map<String, Object> params) {
        campusRepository.setStudyResultSc(params);
    }

    @Override
    public void setOjtPlanDelete(Map<String, Object> params) {
        campusRepository.setOjtPlanDelete(params);
    }

    @Override
    public void setOjtResultInsert(Map<String, Object> params, MultipartHttpServletRequest request, String SERVER_DIR, String BASE_DIR) {
        campusRepository.setOjtResultInsert(params);

        if(params.get("studyUserSeq") != null && !params.get("studyUserSeq").equals("")){
            String studyUserSeq = params.get("studyUserSeq").toString();
            String[] studyUserSeqArr = studyUserSeq.split(",");

            for(String str: studyUserSeqArr){
                params.put("empSeq", str);
                Map<String, Object> userMap = userRepository.getUserInfo(params);
                params.put("studyEmpName", userMap.get("EMP_NAME_KR"));
                params.put("studyDeptName", userMap.get("deptNm"));
                params.put("studyTeamName", userMap.get("teamNm"));
                params.put("studyPositionName", userMap.get("POSITION_NAME"));
                params.put("studyDutyName", userMap.get("DUTY_NAME"));
                params.put("studyClassSn", 5);
                params.put("studyClassText", "학습자");

                campusRepository.setOjtUserInsert(params);
            }
        }

        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        MultipartFile files = request.getFile("files");
        params.put("menuCd", "ojtResult");
        if(files != null){
            if(!files.isEmpty()){
                fileInsMap = mainLib.fileUpload(files, filePath(params, SERVER_DIR));
                fileInsMap.put("ojtResultSn", params.get("ojtResultSn"));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("file_no", fileInsMap.get("file_no"));
                campusRepository.setOjtResultUpdate(fileInsMap);
            }
        }

        if(params.get("readerUserSeq") != null && !params.get("readerUserSeq").equals("")){
            String readerUserSeq = params.get("readerUserSeq").toString();
            String[] readerUserSeqArr = readerUserSeq.split(",");

            for(String str: readerUserSeqArr){
                params.put("empSeq", str);
                Map<String, Object> userMap = userRepository.getUserInfo(params);
                params.put("studyEmpName", userMap.get("EMP_NAME_KR"));
                params.put("studyDeptName", userMap.get("deptNm"));
                params.put("studyTeamName", userMap.get("teamNm"));
                params.put("studyPositionName", userMap.get("POSITION_NAME"));
                params.put("studyDutyName", userMap.get("DUTY_NAME"));
                params.put("studyClassSn", 4);
                params.put("studyClassText", "지도자");

                campusRepository.setOjtUserInsert(params);
            }
        }
    }

    @Override
    public void setStudyPropagInsert(Map<String, Object> params, MultipartHttpServletRequest request, String SERVER_DIR, String BASE_DIR) {
        campusRepository.setStudyPropagInsert(params);

        if(params.get("studyUserSeq") != null && !params.get("studyUserSeq").equals("")){
            String studyUserSeq = params.get("studyUserSeq").toString();
            String[] studyUserSeqArr = studyUserSeq.split(",");

            for(String str: studyUserSeqArr){
                params.put("empSeq", str);
                Map<String, Object> userMap = userRepository.getUserInfo(params);
                params.put("studyEmpName", userMap.get("EMP_NAME_KR"));
                params.put("studyDeptName", userMap.get("deptNm"));
                params.put("studyTeamName", userMap.get("teamNm"));
                params.put("studyPositionName", userMap.get("POSITION_NAME"));
                params.put("studyDutyName", userMap.get("DUTY_NAME"));
                params.put("studyClassSn", 5);
                params.put("studyClassText", "학습자");

                campusRepository.setPropagUserInsert(params);
            }
        }

        if(params.get("readerUserSeq") != null && !params.get("readerUserSeq").equals("")){
            String readerUserSeq = params.get("readerUserSeq").toString();
            String[] readerUserSeqArr = readerUserSeq.split(",");

            for(String str: readerUserSeqArr){
                params.put("empSeq", str);
                Map<String, Object> userMap = userRepository.getUserInfo(params);
                params.put("studyEmpName", userMap.get("EMP_NAME_KR"));
                params.put("studyDeptName", userMap.get("deptNm"));
                params.put("studyTeamName", userMap.get("teamNm"));
                params.put("studyPositionName", userMap.get("POSITION_NAME"));
                params.put("studyDutyName", userMap.get("DUTY_NAME"));
                params.put("studyClassSn", 4);
                params.put("studyClassText", "지도자");

                campusRepository.setPropagUserInsert(params);
            }
        }

        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        MultipartFile files = request.getFile("files");
        params.put("menuCd", "studyJournal");
        if(files != null){
            if(!files.isEmpty()){
                fileInsMap = mainLib.fileUpload(files, filePath(params, SERVER_DIR));
                fileInsMap.put("studyPropagSn", params.get("studyPropagSn"));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("file_no", fileInsMap.get("file_no"));
                campusRepository.setStudyPropagUpdate(fileInsMap);
            }
        }
    }

    @Override
    public void setPropagDelete(Map<String, Object> params) {
        campusRepository.setPropagDelete(params);
    }

    @Override
    public void setResultPropagUpd(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> arr = gson.fromJson((String) params.get("arr"), new TypeToken<List<Map<String, Object>>>(){}.getType());
        if(arr.size() > 0){
            for(int i = 0; i < arr.size(); i++){
                campusRepository.setResultPropagUpd(arr.get(i));
                campusRepository.setResultPropagUserUpd(arr.get(i));
            }
        }
        campusRepository.setStudyResultComplete(params);
    }

    @Override
    public void setOpenStudyInfoIns(Map<String, Object> params) {
        campusRepository.setOpenStudyInfoIns(params);
    }

    @Override
    public void setOpenStudyInfoUpd(Map<String, Object> params) {
        campusRepository.setOpenStudyInfoUpd(params);
    }

    @Override
    public void setOpenNextStep(Map<String, Object> params) {
        campusRepository.setOpenNextStep(params);
    }

    @Override
    public void setOpenStudyUser(Map<String, Object> params) {
        campusRepository.setOpenStudyUser(params);
        List<Map<String, Object>> list = campusRepository.getOpenStudyUserList(params);
        /** 참여자가 5명 이상일시 자동으로 모임확정단계로 넘어감 */
        if(list.size() > 4){
            Map<String, Object> data = campusRepository.getOpenStudyInfoOne(params);
            if(data.get("STEP").equals("B")){
                params.put("step", "C");
                campusRepository.setOpenNextStep(params);
            }
        }
    }

    @Override
    public void setOpenStudyResultUpd(Map<String, Object> params) {
        campusRepository.setOpenStudyResultUpd(params);
        Gson gson = new Gson();
        List<Map<String, Object>> userList = gson.fromJson((String) params.get("userData"), new TypeToken<List<Map<String, Object>>>(){}.getType());

        for(int i = 0 ; i < userList.size() ; i++){
            Map<String, Object> userData = new HashMap<>();
            userData.put("userClass", userList.get(i).get("userClass"));
            userData.put("userClassText", userList.get(i).get("userClassText"));
            userData.put("pk", userList.get(i).get("pk"));
            userData.put("partYN", userList.get(i).get("partYN"));
            campusRepository.setOpenStudyUserResultUpd(userData);
        }
    }

    @Override
    public void setOpenStudyCertReq(Map<String, Object> params) {
        campusRepository.setOpenStudyCertReq(params);
    }

    @Override
    public void setCommonEduIns(Map<String, Object> params) {
        campusRepository.setCommonEduIns(params);
    }

    @Override
    public void setCommonEduUpd(Map<String, Object> params) {
        campusRepository.setCommonEduUpd(params);
    }

    @Override
    public void setCommonEduAddUserAll(Map<String, Object> params) {
        campusRepository.setCommonEduAddUserAll(params);
    }

    @Override
    public void setCommonEduUserUpd(Map<String, Object> params) {
        campusRepository.setCommonEduUserUpd(params);
    }

    @Override
    public void setCommonEduUserTimeUpd(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> userList = gson.fromJson((String) params.get("userData"), new TypeToken<List<Map<String, Object>>>(){}.getType());

        for(int i = 0 ; i < userList.size() ; i++){
            Map<String, Object> userData = new HashMap<>();
            userData.put("pk", userList.get(i).get("pk"));
            userData.put("eduTime", userList.get(i).get("eduTime"));
            campusRepository.setCommonEduUserTimeUpd(userData);
        }
    }

    @Override
    public Map<String, Object> setTargetInsert(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();

        try {
            campusRepository.setTargetInsert(params);
            result.put("code", "200");
            result.put("message", "데이터 저장이 완료되었습니다.");
        }catch (Exception e) {
            result.put("code", "500");
            result.put("message", "데이터 저장 중 에러가 발생했습니다.");
        }
        return result;
    }

    @Override
    @Transactional
    public Map<String, Object> setTargetDetailInsert(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();

        try {
            if (params.containsKey("empSeq") == true && params.get("empSeq") != null && !params.get("empSeq").equals("")) {
                campusRepository.setTargetDetailDelete(params);
            }
            Gson gson = new Gson();
            List<Map<String, Object>> SYSTEM_CATEGORY_DETAIL_LIST = gson.fromJson((String) params.get("eduCategoryDetailIdList"), new TypeToken<List<Map<String, Object>>>(){}.getType());
            params.put("eduCategoryDetailIdList", SYSTEM_CATEGORY_DETAIL_LIST);
            campusRepository.setTargetDetailInsert(params);
            result.put("code", "200");
            result.put("message", "데이터 저장이 완료되었습니다.");
        }catch (Exception e) {
            result.put("code", "500");
            result.put("message", "데이터 저장 중 에러가 발생했습니다.");
        }
        return result;
    }

    @Override
    public Map<String, Object> setEduTargetDetailUpdate(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();

        try {
            Gson gson = new Gson();
            List<Map<String, Object>> EDU_TARGET_DETAIL_LIST = gson.fromJson((String) params.get("eduTargetDetailIdList"), new TypeToken<List<Map<String, Object>>>(){}.getType());
            params.put("eduTargetDetailIdList", EDU_TARGET_DETAIL_LIST);
            campusRepository.setEduTargetDetailUpdate(params);
            result.put("code", "200");
            result.put("message", "데이터 저장이 완료되었습니다.");
        } catch (Exception e) {
            result.put("code", "500");
            result.put("message", "데이터 저장 중 에러가 발생했습니다.");
        }
        return result;
    }

    @Override
    public Map<String, Object> setEduPlanInsert(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();

        try {
            campusRepository.setEduPlanInsert(params);
            result.put("code", "200");
            result.put("message", "데이터 저장이 완료되었습니다.");
        }catch (Exception e) {
            result.put("code", "500");
            result.put("message", "데이터 저장 중 에러가 발생했습니다.");
        }
        return result;
    }

    @Override
    public Map<String, Object> setEduPlanUpdate(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();

        try {
            campusRepository.setEduPlanUpdate(params);
            result.put("code", "200");
            result.put("message", "데이터 저장이 완료되었습니다.");
        } catch (Exception e) {
            result.put("code", "500");
            result.put("message", "데이터 저장 중 에러가 발생했습니다.");
        }
        return result;
    }

    @Override
    public Map<String, Object> updateEduInfoApprStat(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();

        try {
            campusRepository.updateEduInfoApprStat(params);
            result.put("code", "200");
            result.put("message", "데이터 저장이 완료되었습니다.");
        } catch (Exception e) {
            result.put("code", "500");
            result.put("message", "데이터 저장 중 에러가 발생했습니다.");
        }
        return result;
    }

    @Override
    public Map<String, Object> updateApprStat(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();

        try {
            campusRepository.updateApprStat(params);
            result.put("code", "200");
            result.put("message", "데이터 저장이 완료되었습니다.");
        } catch (Exception e) {
            result.put("code", "500");
            result.put("message", "데이터 저장 중 에러가 발생했습니다.");
        }
        return result;
    }

    @Override
    public void setEduCode(Map<String, Object> params) {
        campusRepository.setEduCode(params);
    }

    @Override
    public void setEduCategory(Map<String, Object> params) {
        campusRepository.setEduCategory(params);
    }

    @Override
    public void setEduCategoryDetail(Map<String, Object> params) {
        campusRepository.setEduCategoryDetail(params);
    }

    @Override
    public void setEduCodeUpd(Map<String, Object> params) {
        campusRepository.setEduCodeUpd(params);
    }

    @Override
    public void setEduCategoryUpd(Map<String, Object> params) {
        campusRepository.setEduCategoryUpd(params);
    }

    @Override
    public void setEduCategoryDetailUpd(Map<String, Object> params) {
        campusRepository.setEduCategoryDetailUpd(params);
    }

    @Override
    public void setEduCodeDel(Map<String, Object> params) {
        campusRepository.setEduCodeDel(params);
    }

    @Override
    public void setEduCategoryDel(Map<String, Object> params) {
        campusRepository.setEduCategoryDel(params);
    }

    @Override
    public void setEduCategoryDetailDel(Map<String, Object> params) {
        campusRepository.setEduCategoryDetailDel(params);
    }

    @Override
    public void setDutyInfoIns(Map<String, Object> params) {
        campusRepository.setDutyInfoIns(params);
    }

    @Override
    public void setDutyInfoUpd(Map<String, Object> params) {
        campusRepository.setDutyInfoUpd(params);
    }

    @Override
    public void setTargetCertReq(Map<String, Object> params) {
        campusRepository.setTargetCertReq(params);
    }

    @Override
    public void setDutyCertReq(Map<String, Object> params) {
        campusRepository.setDutyCertReq(params);
    }

    @Override
    public void updateDocState(Map<String, Object> bodyMap) throws Exception {
        bodyMap.put("docSts", bodyMap.get("approveStatCode"));
        String docSts = String.valueOf(bodyMap.get("docSts"));
        String approKey = String.valueOf(bodyMap.get("approKey"));
        String docId = String.valueOf(bodyMap.get("docId"));
        String processId = String.valueOf(bodyMap.get("processId"));
        String empSeq = String.valueOf(bodyMap.get("empSeq"));
        approKey = approKey.split("_")[1];
        System.out.println(approKey);
        System.out.println(processId);
        bodyMap.put("approKey", approKey);

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("eduInfoId", approKey);
        params.put("docName", bodyMap.get("formName"));
        params.put("docId", docId);
        params.put("docTitle", bodyMap.get("docTitle"));
        params.put("approveStatCode", docSts);
        params.put("empSeq", empSeq);

        if("10".equals(docSts) || "10".equals(docSts)) { // 상신 - 결재
            params.put("status", "10");
            campusRepository.updateEduInfoApprStat(params);
        }else if("30".equals(docSts) || "40".equals(docSts)) { //반려
            params.put("status", "30");
            campusRepository.updateEduInfoApprStat(params);
        }else if("40".equals(docSts)) { //회수
            params.put("status", "40");
            campusRepository.updateEduInfoApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결
            params.put("status", "100");
            campusRepository.updateEduInfoFinalApprStat(params);
        }
    }

    @Override
    public void updateResDocState(Map<String, Object> bodyMap) throws Exception {
        bodyMap.put("docSts", bodyMap.get("approveStatCode"));
        String docSts = String.valueOf(bodyMap.get("docSts"));
        String approKey = String.valueOf(bodyMap.get("approKey"));
        String docId = String.valueOf(bodyMap.get("docId"));
        String processId = String.valueOf(bodyMap.get("processId"));
        String empSeq = String.valueOf(bodyMap.get("empSeq"));
        approKey = approKey.split("_")[1];
        System.out.println(approKey);
        System.out.println(processId);
        bodyMap.put("approKey", approKey);

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("eduInfoId", approKey);
        params.put("docName", bodyMap.get("formName"));
        params.put("docId", docId);
        params.put("docTitle", bodyMap.get("docTitle"));
        params.put("approveStatCode", docSts);
        params.put("empSeq", empSeq);

        if("10".equals(docSts) || "10".equals(docSts)) { // 상신 - 결재
            params.put("status", "10");
            campusRepository.updateEduResultApprStat(params);
        }else if("30".equals(docSts)) { // 반려
            params.put("status", "30");
            campusRepository.updateEduResultApprStat(params);
        }else if("30".equals(docSts)) { // 회수
            params.put("status", "40");
            campusRepository.updateEduResultApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결
            params.put("status", "100");
            campusRepository.updateEduResultFinalApprStat(params);
        }
    }

    @Override
    public void deleteStudyJournal(Map<String, Object> params) {
        campusRepository.deleteStudyJournal(params);
        campusRepository.deleteStudyResultUser(params);
    }

    @Override
    public void setStudyInfoComplete(Map<String, Object> params) {
        campusRepository.setStudyInfoComplete(params);
    }

    @Override
    public void setPropagInfoComplete(Map<String, Object> params) {
        campusRepository.setPropagInfoComplete(params);
    }

    @Override
    public void setStudyResult(Map<String, Object> params) {
        campusRepository.setStudyResult(params);

        campusRepository.setStudyResultComplete(params);
    }

    @Override
    public Map<String, Object> getStudyResultData(Map<String, Object> params) {
        return campusRepository.getStudyResultData(params);
    }

    @Override
    public Map<String, Object> getStudyResultOne(Map<String, Object> params) {
        return campusRepository.getStudyResultOne(params);
    }

    @Override
    public List<Map<String, Object>> getStudyResultList(Map<String, Object> params) {

        List<Map<String, Object>> list = campusRepository.getStudyResultList(params);

        return list;
    }

    @Override
    public void deleteOjtResult(Map<String, Object> params) {
        campusRepository.deleteOjtResult(params);
    }


    @Override
    public void setStudyResultComplete(Map<String, Object> params) {
        campusRepository.setStudyResultComplete(params);
    }
}
