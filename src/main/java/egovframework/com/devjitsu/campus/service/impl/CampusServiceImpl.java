package egovframework.com.devjitsu.campus.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import dev_jitsu.MainLib;
import egovframework.com.devjitsu.campus.repository.CampusRepository;
import egovframework.com.devjitsu.campus.service.CampusService;
import egovframework.com.devjitsu.common.repository.CommonRepository;
import egovframework.com.devjitsu.g20.repository.PRJRepository;
import egovframework.com.devjitsu.gw.user.repository.UserRepository;
import lombok.var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class CampusServiceImpl implements CampusService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CampusRepository campusRepository;

    @Autowired
    private CommonRepository commonRepository;

    @Autowired
    private PRJRepository prjRepository;

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
    public List<Map<String, Object>> getEduResponsableList(Map<String, Object> params){
        return campusRepository.getEduResponsableList(params);
    }
    @Override
    public void setEduInfoDelete(Map<String, Object> params) {
        campusRepository.setEduInfoDelete(params);
    }

    @Override
    public void setOpenStudyInfoDelete(Map<String, Object> params) {
        campusRepository.setOpenStudyInfoDelete(params);
    }
    @Override
    public void setStudyInfoDelete(Map<String, Object> params) {
        campusRepository.setStudyInfoDelete(params);
    }

    @Override
    public Map<String, Object> getEduInfoOne(Map<String, Object> params){
        Map<String, Object> result = campusRepository.getEduInfoOne(params);
//        result.put("eduFileList", campusRepository.getEduInfoFile(result));
        return result;
    }

    @Override
    public Map<String, Object> getEduInfoFile(Map<String, Object> params){
        return campusRepository.getEduInfoFile(params);
    }

    @Override
    public List<Map<String, Object>> getEduInfoFileList(Map<String, Object> params){
        return campusRepository.getEduInfoFileList(params);
    }

    @Override
    public Map<String, Object> getEduResultOne(Map<String, Object> params){
        return campusRepository.getEduResultOne(params);
    }

    @Override
    public List<Map<String, Object>> getEduResultInfoFileList(Map<String, Object> params){
        return campusRepository.getEduResultInfoFileList(params);
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
    public Map<String, Object> getOjtResultInfoOne(Map<String, Object> params){
        return campusRepository.getOjtResultInfoOne(params);
    }

    @Override
    public Map<String, Object> getStudyInfoOne(Map<String, Object> params){
        return campusRepository.getStudyInfoOne(params);
    }

    @Override
    public Map<String, Object> getOjtOjtResultSnOne(Map<String, Object> params){
        return campusRepository.getOjtOjtResultSnOne(params);
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
    public Map<String, Object> getStudyPropagInfoOne(Map<String, Object> params){
        return campusRepository.getStudyPropagInfoOne(params);
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
    public List<Map<String, Object>> getStudyPropagUserInfo(Map<String, Object> params){
        return campusRepository.getStudyPropagUserInfo(params);
    }

    @Override
    public List<Map<String, Object>> getStudyPropagUserInfo2(Map<String, Object> params){
        return campusRepository.getStudyPropagUserInfo2(params);
    }

    @Override
    public List<Map<String, Object>> getStudyOjtUserInfo(Map<String, Object> params){
        return campusRepository.getStudyOjtUserInfo(params);
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
    public List<Map<String, Object>> getOpenStudyInfoAdminList(Map<String, Object> params){
        return campusRepository.getOpenStudyInfoAdminList(params);
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
    public List<Map<String, Object>> getOpenStudyUserList2(Map<String, Object> params){
        return campusRepository.getOpenStudyUserList2(params);
    }

    @Override
    public Map<String, Object> getOpenStudyResultList(Map<String, Object> params){
        return campusRepository.getOpenStudyResultList(params);
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
    public List<Map<String, Object>> getCommonEduMngList(Map<String, Object> params){
        return campusRepository.getCommonEduMngList(params);
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
    public List<Map<String, Object>> getEduMyStatList(Map<String, Object> params){
        return campusRepository.getEduMyStatList(params);
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
    public Map<String, Object> setEduInfoInsert(Map<String, Object> params, MultipartFile[] fileList, String serverDir, String baseDir) {
        campusRepository.setEduInfoInsert(params);

        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        if(fileList.length > 0){
            params.put("menuCd", "eduReq");

            List<Map<String, Object>> list = mainLib.multiFileUpload(fileList, filePath(params, serverDir));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", "eduInfo_" + params.get("eduInfoId"));
                list.get(i).put("empSeq", params.get("empSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, baseDir));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf('.')));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf('.') + 1));

                commonRepository.insFileInfoOne(list.get(i));
            }
        }

        return params;
    }

    @Override
    public void setEduInfoModify(Map<String, Object> params, MultipartFile[] fileList, String serverDir, String baseDir) {
        campusRepository.setEduInfoModify(params);

        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        if(fileList.length > 0){
            params.put("menuCd", "eduReq");

            List<Map<String, Object>> list = mainLib.multiFileUpload(fileList, filePath(params, serverDir));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", "eduInfo_" + params.get("eduInfoId"));
                list.get(i).put("empSeq", params.get("empSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, baseDir));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf('.')));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf('.') + 1));

                commonRepository.insFileInfoOne(list.get(i));
            }
        }
    }

    @Override
    public void setEduResultInsert(Map<String, Object> params, MultipartFile[] fileList, String serverDir, String baseDir) {
        campusRepository.setEduInfoUpdate(params);
        campusRepository.setEduResultInsert(params);

        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        if(fileList.length > 0){
            params.put("menuCd", "eduRes");

            List<Map<String, Object>> list = mainLib.multiFileUpload(fileList, filePath(params, serverDir));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", "eduInfo_" + params.get("eduInfoId"));
                list.get(i).put("empSeq", params.get("empSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, baseDir));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf('.')));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf('.') + 1));

                commonRepository.insFileInfoOne(list.get(i));
            }
        }
    }

    @Override
    public void setEduResultModify(Map<String, Object> params, MultipartFile[] fileList, String serverDir, String baseDir) {
        campusRepository.setEduInfoUpdate(params);
        campusRepository.setEduResultModify(params);

        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        if(fileList.length > 0){
            params.put("menuCd", "eduRes");

            List<Map<String, Object>> list = mainLib.multiFileUpload(fileList, filePath(params, serverDir));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", "eduInfo_" + params.get("eduInfoId"));
                list.get(i).put("empSeq", params.get("empSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, baseDir));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf('.')));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf('.') + 1));

                commonRepository.insFileInfoOne(list.get(i));
            }
        }
    }

    @Override
    public void setMngCheckUpd(Map<String, Object> params) {
        campusRepository.setMngCheckUpd(params);
    }

    @Override
    public void setEduResultEduTimeUpd(Map<String, Object> params) {
        campusRepository.setEduResultEduTimeUpd(params);
    }

    @Override
    public Map<String, Object> setStudyInfoInsert(Map<String, Object> params, MultipartFile[] fileList, String serverDir, String baseDir) {
        MainLib mainLib = new MainLib();

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

        if(fileList.length > 0){
            params.put("menuCd", "studyInfo");

            List<Map<String, Object>> list = mainLib.multiFileUpload(fileList, filePath(params, serverDir));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", "studyInfo_" + params.get("studyUserSn"));
                list.get(i).put("empSeq", params.get("empSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, baseDir));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf('.')));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf('.') + 1));

                commonRepository.insFileInfoOne(list.get(i));
            }
        }
        return params;
    }

    @Override
    public void setStudyInfoModify(Map<String, Object> params,  MultipartFile[] fileList, String serverDir, String baseDir) {
        MainLib mainLib = new MainLib();

        int studyClass = Integer.parseInt(params.get("studyClassSn").toString());
        campusRepository.setStudyInfoModify(params);
        campusRepository.setStudyUserDelete(params);

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

        if(fileList.length > 0){
            params.put("menuCd", "studyInfo");

            List<Map<String, Object>> list = mainLib.multiFileUpload(fileList, filePath(params, serverDir));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", "studyInfo_" + params.get("pk"));
                list.get(i).put("empSeq", params.get("empSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, baseDir));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf('.')));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf('.') + 1));

                commonRepository.insFileInfoOne(list.get(i));
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

            params.put("empSeq", seqArr[i]);

            Map<String, Object> weekCount = campusRepository.getStudyInfoCountStudyWeekly(params);
            Map<String, Object> weekTime = campusRepository.getRealEduTimeStudyWeekly(params);
            Map<String, Object> studyTime = campusRepository.getRealStudyTimeStudyWeekly(params);

            /** 학습조 주당 2시간 인정 */
            double realEduTime = Double.valueOf(String.valueOf(weekTime.get("REAL_EDU_TIME")));
            int infoCount = Integer.valueOf(String.valueOf(weekCount.get("studyInfoCount")));
            double realStudyTime = Double.valueOf(String.valueOf(studyTime.get("STUDY_TIME")));

            if(infoCount == 1){
                if(realEduTime > 2){
                    params.put("realEduTime", '2');
                }else{
                    params.put("realEduTime", params.get("realEduTime"));
                }
            }else{
                if(realEduTime > 2){
                    /*params.put("realEduTime", '0');*/
                    if(realStudyTime < 2){
                        params.put("realEduTime", 2-realStudyTime);
                    }else{
                        params.put("realEduTime", '0');
                    }
                }else{
                    params.put("realEduTime", params.get("realEduTime"));
                }
            }
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

    @Override
    public void setStudyJournalModify(Map<String, Object> params, MultipartHttpServletRequest request, String SERVER_DIR, String BASE_DIR) {
        campusRepository.setStudyJournalModify(params);
        campusRepository.setStudyResultUserDelete(params);


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

            params.put("empSeq", seqArr[i]);

            Map<String, Object> weekCount = campusRepository.getStudyInfoCountStudyWeekly(params);
            Map<String, Object> weekTime = campusRepository.getRealEduTimeStudyWeekly(params);
            Map<String, Object> studyTime = campusRepository.getRealStudyTimeStudyWeekly(params);

            /** 학습조 주당 2시간 인정 */
            double realEduTime = Double.valueOf(String.valueOf(weekTime.get("REAL_EDU_TIME")));
            int infoCount = Integer.valueOf(String.valueOf(weekCount.get("studyInfoCount")));
            double realStudyTime = Double.valueOf(String.valueOf(studyTime.get("STUDY_TIME")));

            if(infoCount == 1){
                if(realEduTime > 2){
                    params.put("realEduTime", '2');
                }else{
                    params.put("realEduTime", params.get("realEduTime"));
                }
            }else{
                if(realEduTime > 2){
                    /*params.put("realEduTime", '0');*/
                        if(realStudyTime < 2){
                            params.put("realEduTime", 2-realStudyTime);
                        }else{
                            params.put("realEduTime", '0');
                        }
                }else{
                    params.put("realEduTime", params.get("realEduTime"));
                }
            }
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

                Map<String, Object> eduTime = campusRepository.getStudyOjtInfoOne(params);
                params.put("realEduUserTime", eduTime.get("EDU_TIME_HALF"));

                /** OJT 하루 2시간 인정*/
                Map<String, Object> todayUserCount = campusRepository.getOjtInfoCountStudyToday(params);
                Map<String, Object> todayUserTime = campusRepository.getRealEduTimeOjtUserToday(params);
                Map<String, Object> studyUserTime = campusRepository.getRealOjtTimeStudyToday(params);
                /** 건당 최대 20시간*/
                Map<String, Object> studyUserOneTime = campusRepository.getRealOjtOneTimeStudyToday(params);

                double realEduUserTime = Double.valueOf(String.valueOf(todayUserTime.get("REAL_EDU_TIME")));
                int infoUserCount = Integer.valueOf(String.valueOf(todayUserCount.get("studyInfoCount")));
                double realStudyUserTime = Double.valueOf(String.valueOf(studyUserTime.get("STUDY_TIME")));
                double realStudyUserOneTime = Double.valueOf(String.valueOf(studyUserOneTime.get("STUDY_ONE_TIME")));
                /*20-realStudyUserOneTime*/
                if(realStudyUserOneTime < 20){
                    if(infoUserCount == 1){
                        if(realEduUserTime > 2){
                            params.put("realEduUserTime", '2');
                        }else{
                            params.put("realEduUserTime", eduTime.get("EDU_TIME_HALF"));
                        }
                    }else{
                        if(realStudyUserTime < 2){
                            params.put("realEduUserTime", 2-realStudyUserTime);
                        }else{
                            params.put("realEduUserTime", '0');
                        }
                    }

                }else if(realStudyUserOneTime == 20 || realStudyUserOneTime > 20){
                    params.put("realEduUserTime", '0');
                }
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

                Map<String, Object> eduTime = campusRepository.getStudyOjtInfoOne(params);
                params.put("realEduMngTime", eduTime.get("EDU_TIME"));

                /** OJT 지도자 하루 2시간 인정 */
                Map<String, Object> todayMngCount = campusRepository.getOjtInfoCountStudyToday(params);
                Map<String, Object> todayMngTime = campusRepository.getRealEduTimeOjtMngToday(params);
                Map<String, Object> studyMngTime = campusRepository.getRealOjtTimeStudyToday(params);
                /** 건당 최대 20시간*/
                Map<String, Object> studyUserOneTime = campusRepository.getRealOjtOneTimeStudyToday(params);

                double realEduMngTime = Double.valueOf(String.valueOf(todayMngTime.get("REAL_EDU_TIME")));
                int infoMngCount = Integer.valueOf(String.valueOf(todayMngCount.get("studyInfoCount")));
                double realStudyMngTime = Double.valueOf(String.valueOf(studyMngTime.get("STUDY_TIME")));
                double realStudyMngOneTime = Double.valueOf(String.valueOf(studyUserOneTime.get("STUDY_ONE_TIME")));

                if(realStudyMngOneTime < 20){
                    if(infoMngCount == 1){
                        if(realEduMngTime > 2){
                            params.put("realEduMngTime", '2');
                        }else{
                            params.put("realEduMngTime", eduTime.get("EDU_TIME"));
                        }
                    }else{
                        if(realEduMngTime > 2 || realEduMngTime == 2){
                            if(realStudyMngTime < 2){
                                params.put("realEduMngTime", 2-realStudyMngTime);
                            }else{
                                params.put("realEduMngTime", '0');
                            }
                        }else{
                            params.put("realEduMngTime", eduTime.get("EDU_TIME"));
                        }
                    }
                }else if(realStudyMngOneTime == 20 || realStudyMngOneTime > 20){
                    params.put("realEduMngTime", '0');
                }
                campusRepository.setOjtUserInsert(params);
            }
        }
    }

    @Override
    public void setOjtResultModify(Map<String, Object> params, MultipartHttpServletRequest request, String SERVER_DIR, String BASE_DIR) {
        campusRepository.setOjtUserDelete(params);
        campusRepository.setOjtResultModify(params);

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

                Map<String, Object> eduTime = campusRepository.getStudyPropagInfoOne(params);
                params.put("realEduUserTime", eduTime.get("EDU_USER_TIME"));

                /** 전파학습 주당 2시간 인정 */
                Map<String, Object> weekUserCount = campusRepository.getPropagInfoCountStudyWeekly(params);
                Map<String, Object> weekUserTime = campusRepository.getRealEduTimePropagUsertWeekly(params);
                Map<String, Object> studyUserTime = campusRepository.getRealPropagTimeStudyWeekly(params);

                double realEduTime = Double.valueOf(String.valueOf(weekUserTime.get("REAL_EDU_TIME")));
                int infoCount = Integer.valueOf(String.valueOf(weekUserCount.get("studyInfoCount")));
                double realStudyTime = Double.valueOf(String.valueOf(studyUserTime.get("STUDY_TIME")));

                //
                if(infoCount == 1){
                    if(realEduTime > 2){
                        params.put("realEduUserTime", '2');
                    }else{
                        params.put("realEduUserTime", eduTime.get("EDU_USER_TIME"));
                    }
                }else{
                    if(realEduTime > 2){
                        if(realStudyTime < 2){
                            params.put("realEduUserTime", 2-realStudyTime);
                        }else{
                            params.put("realEduUserTime", '0');
                        }
                    }else{
                        params.put("realEduUserTime", eduTime.get("EDU_USER_TIME"));
                    }
                }
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

                Map<String, Object> eduTime = campusRepository.getStudyPropagInfoOne(params);
                params.put("realEduMngTime", eduTime.get("EDU_MNG_TIME"));

                /** 전파학습 지도자 주당 2시간 인정 */
                Map<String, Object> weekMngCount = campusRepository.getPropagInfoCountStudyWeekly(params);
                Map<String, Object> weekMngTime = campusRepository.getRealEduTimePropagMngtWeekly(params);
                Map<String, Object> studyMngTime = campusRepository.getRealPropagTimeStudyWeekly(params);

                double realEduTime = Double.valueOf(String.valueOf(weekMngTime.get("REAL_EDU_TIME")));
                int infoCount = Integer.valueOf(String.valueOf(weekMngCount.get("studyInfoCount")));
                double realStudyTime = Double.valueOf(String.valueOf(studyMngTime.get("STUDY_TIME")));

                if(infoCount == 1){
                    if(realEduTime > 2){
                        params.put("realEduMngTime", '2');
                    }else{
                        params.put("realEduMngTime", eduTime.get("EDU_MNG_TIME"));
                    }
                }else{
                    if(realEduTime > 2){
                        if(realStudyTime < 2){
                            params.put("realEduMngTime", 2-realStudyTime);
                        }else{
                            params.put("realEduMngTime", '0');
                        }
                    }else{
                        params.put("realEduMngTime", eduTime.get("EDU_MNG_TIME"));
                    }
                }
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
    public void setStudyPropagModify(Map<String, Object> params, MultipartHttpServletRequest request, String SERVER_DIR, String BASE_DIR) {
        campusRepository.setStudyPropagModify(params);
        campusRepository.setPropagUserDelete(params);

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

                Map<String, Object> eduTime = campusRepository.getStudyPropagInfoOne(params);
                params.put("realEduUserTime", eduTime.get("EDU_USER_TIME"));

                /** 전파학습 주당 2시간 인정 */
                Map<String, Object> weekUserCount = campusRepository.getPropagInfoCountStudyWeekly(params);
                Map<String, Object> weekUserTime = campusRepository.getRealEduTimePropagUsertWeekly(params);
                Map<String, Object> studyUserTime = campusRepository.getRealPropagTimeStudyWeekly(params);

                double realEduTime = Double.valueOf(String.valueOf(weekUserTime.get("REAL_EDU_TIME")));
                int infoCount = Integer.valueOf(String.valueOf(weekUserCount.get("studyInfoCount")));
                double realStudyTime = Double.valueOf(String.valueOf(studyUserTime.get("STUDY_TIME")));

                if(infoCount == 1){
                    if(realEduTime > 2){
                        params.put("realEduUserTime", '2');
                    }else{
                        params.put("realEduUserTime", eduTime.get("EDU_USER_TIME"));
                    }
                }else{
                    if(realEduTime > 2){
                        if(realStudyTime < 2){
                            params.put("realEduUserTime", 2-realStudyTime);
                        }else{
                            params.put("realEduUserTime", '0');
                        }
                    }else{
                        params.put("realEduUserTime", eduTime.get("EDU_USER_TIME"));
                    }
                }
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

                Map<String, Object> eduTime = campusRepository.getStudyPropagInfoOne(params);
                params.put("realEduMngTime", eduTime.get("EDU_MNG_TIME"));

                /** 전파학습 지도자 주당 2시간 인정 */
                Map<String, Object> weekMngCount = campusRepository.getPropagInfoCountStudyWeekly(params);
                Map<String, Object> weekMngTime = campusRepository.getRealEduTimePropagMngtWeekly(params);
                Map<String, Object> studyMngTime = campusRepository.getRealPropagTimeStudyWeekly(params);

                double realEduTime = Double.valueOf(String.valueOf(weekMngTime.get("REAL_EDU_TIME")));
                int infoCount = Integer.valueOf(String.valueOf(weekMngCount.get("studyInfoCount")));
                double realStudyTime = Double.valueOf(String.valueOf(studyMngTime.get("STUDY_TIME")));

                if(infoCount == 1){
                    if(realEduTime > 2){
                        params.put("realEduMngTime", '2');
                    }else{
                        params.put("realEduMngTime", eduTime.get("EDU_MNG_TIME"));
                    }
                }else{
                    if(realEduTime > 2){
                        if(realStudyTime < 2){
                            params.put("realEduMngTime", 2-realStudyTime);
                        }else{
                            params.put("realEduMngTime", '0');
                        }
                    }else{
                        params.put("realEduMngTime", eduTime.get("EDU_MNG_TIME"));
                    }
                }
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
        campusRepository.delPropagUserDelete(params);
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
    }

    @Override
    public void setOpenStudyInfoIns(Map<String, Object> params) {
        campusRepository.setOpenStudyInfoIns(params);
    }

    @Override
    public List<Map<String, Object>> getRealEduTimeCheck(Map<String, Object> params) {
        return campusRepository.getRealEduTimeCheck(params);
    }

    @Override
    public void setOpenStudyRealEduTimeUpd(Map<String, Object> params) {
        campusRepository.setOpenStudyRealEduTimeUpd(params);
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
    public boolean getOpenStudyUserDoubleChk(Map<String, Object> params) {
        return campusRepository.getOpenStudyUserDoubleChk(params);
    }

    @Override
    public void setOpenStudyUser(Map<String, Object> params) {
        campusRepository.setOpenStudyUser(params);
        List<Map<String, Object>> list = campusRepository.getOpenStudyUserList(params);
        /** 참여자가 5명 이상일시 자동으로 모임확정단계로 넘어감
        if(list.size() > 4){
            Map<String, Object> data = campusRepository.getOpenStudyInfoOne(params);
            if(data.get("STEP").equals("B")){
                params.put("step", "C");
                campusRepository.setOpenNextStep(params);
            }
        }*/
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
            Map<String, Object> sendEmpMap = new HashMap<>();       // 요청자 정보
            Map<String, Object> recieveEmpMap = new HashMap<>();    // 승인자 정보
            Map<String, Object> paramsMap = new HashMap<>();
            sendEmpMap = campusRepository.getEduTargetOne(params);
            params.put("frKey", sendEmpMap.get("EDU_TARGET_ID"));
            params.put("type", "목표기술서");

            if(params.get("status").equals("0")){
                campusRepository.delPsCheck(params);
            } else {

                params.put("regEmpSeq", params.get("empSeq"));
                if(sendEmpMap.get("REG_DUTY_CODE").toString().equals("")){  // 승인 요청자가 팀원급일때
                    params.put("dutyCode", "4,5");
                } else if (sendEmpMap.get("REG_DUTY_CODE").equals("4") || sendEmpMap.get("REG_DUTY_CODE").equals("5")){  // 승인 요청자가 팀장급일때
                    params.put("type", "ld");
                    params.put("dutyCode", "2,3,7");
                }
                recieveEmpMap = campusRepository.getApprEmpInfo(params);

                paramsMap.put("sdEmpSeq", sendEmpMap.get("REG_EMP_SEQ"));           // 요청자 사번
                paramsMap.put("SND_EMP_NM", sendEmpMap.get("REG_EMP_NAME"));        // 요청자 성명
                paramsMap.put("SND_DEPT_SEQ", sendEmpMap.get("REG_DEPT_SEQ"));      // 요청자 부서
                paramsMap.put("SND_DEPT_NM", sendEmpMap.get("REG_DEPT_NAME"));      // 요청자 부서
                paramsMap.put("recEmpSeq", recieveEmpMap.get("EMP_SEQ"));               // 승인자
                paramsMap.put("ntTitle", "[승인요청] 요청자 : " + sendEmpMap.get("REG_EMP_NAME"));     // 제목
                paramsMap.put("ntContent", "[목표기술서] " + sendEmpMap.get("REG_DEPT_NAME") + " - " + sendEmpMap.get("REG_EMP_NAME"));  // 내용
                paramsMap.put("ntUrl", "/process/processCheckList.do?type=process");   // url
                paramsMap.put("frKey", sendEmpMap.get("EDU_TARGET_ID"));   // url
                paramsMap.put("psType", "목표기술서");   // url
                commonRepository.setAlarm(paramsMap);

                paramsMap.put("recEmpSeq", "|" + recieveEmpMap.get("EMP_SEQ") + "|");   // 승인자
                paramsMap.put("ntUrl", "/campus/dutyInfoLeader.do?type=process");       // url
                commonRepository.setPsCheck(paramsMap);

                result.put("code", "200");
                result.put("message", "데이터 저장이 완료되었습니다.");
            }

            campusRepository.updateApprStat(params);

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
        Map<String, Object> sendEmpMap = new HashMap<>();

        sendEmpMap = campusRepository.getEduTargetOne(params);
        params.put("frKey", sendEmpMap.get("EDU_TARGET_ID"));

        if(params.get("status").equals("30") && params.get("type").equals("mng")){
            params.put("returnStat", "Y");
        }

        params.put("type", "목표기술서");

        if(params.get("status").equals("30")){
            campusRepository.delPsCheck(params);
        } else {
            campusRepository.updPsStatus(params);
        }

        campusRepository.setTargetCertReq(params);
    }

    @Override
    public void setDutyCertReq(Map<String, Object> params) {
        if((params.get("status").equals("30") && params.get("type").equals("mng")) || params.get("status").equals("0")){
            params.put("returnStat", "Y");
        }
        campusRepository.setDutyCertReq(params);

        Map<String, Object> sendEmpMap = new HashMap<>();       // 요청자 정보
        Map<String, Object> recieveEmpMap = new HashMap<>();    // 승인자 정보
        Map<String, Object> paramsMap = new HashMap<>();

        if(params.get("status").equals("10")){
            sendEmpMap = campusRepository.getDutyInfoOne(params);
            if(sendEmpMap.get("REG_DUTY_CODE").toString().equals("")){  // 승인 요청자가 팀원급일때
                params.put("dutyCode", "4,5");
            } else if (sendEmpMap.get("REG_DUTY_CODE").equals("4") || sendEmpMap.get("REG_DUTY_CODE").equals("5")){  // 승인 요청자가 팀장급일때
                params.put("type", "ld");
                params.put("dutyCode", "2,3,7");
            }
            recieveEmpMap = campusRepository.getApprEmpInfo(params);

            paramsMap.put("sdEmpSeq", sendEmpMap.get("REG_EMP_SEQ"));           // 요청자 사번
            paramsMap.put("SND_EMP_NM", sendEmpMap.get("REG_EMP_NAME"));        // 요청자 성명
            paramsMap.put("SND_DEPT_SEQ", sendEmpMap.get("REG_DEPT_SEQ"));      // 요청자 부서
            paramsMap.put("SND_DEPT_NM", sendEmpMap.get("REG_DEPT_NAME"));      // 요청자 부서
            paramsMap.put("recEmpSeq", recieveEmpMap.get("EMP_SEQ"));               // 승인자
            paramsMap.put("ntTitle", "[승인요청] 요청자 : " + sendEmpMap.get("REG_EMP_NAME"));     // 제목
            paramsMap.put("ntContent", "[직무기술서] " + sendEmpMap.get("REG_DEPT_NAME") + " - " + sendEmpMap.get("REG_EMP_NAME"));  // 내용
            paramsMap.put("ntUrl", "/process/processCheckList.do?type=process");   // url
            paramsMap.put("frKey", params.get("pk"));   // url
            paramsMap.put("psType", "직무기술서");   // url
            commonRepository.setAlarm(paramsMap);

            paramsMap.put("recEmpSeq", "|" + recieveEmpMap.get("EMP_SEQ") + "|");   // 승인자
            paramsMap.put("ntUrl", "/campus/dutyInfoLeader.do?type=process");       // url
            commonRepository.setPsCheck(paramsMap);
        } else if(params.get("status").equals("0") || params.get("status").equals("30")){
            paramsMap.put("type", "직무기술서");
            paramsMap.put("frKey", params.get("pk"));
            campusRepository.delPsCheck(paramsMap);
        }
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

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 결재
            params.put("status", "10");
            campusRepository.updateEduInfoApprStat(params);
        }else if("30".equals(docSts)) { //반려
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

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 결재
            params.put("status", "10");
            campusRepository.updateEduResultApprStat(params);
        }else if("30".equals(docSts)) { // 반려
            params.put("status", "30");
            campusRepository.updateEduResultApprStat(params);
        }else if("40".equals(docSts)) { // 회수
            params.put("status", "40");
            campusRepository.updateEduResultApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결
            Map<String, Object> eduInfo = campusRepository.getEduResultOne(params);

            String eduFormType = eduInfo.get("EDU_FORM_TYPE").toString();
            int realEduTime = 0;
            int eduTime = Integer.parseInt(eduInfo.get("TERM_TIME").toString());

            Map<String, Object> searchMap = new HashMap<>();
            searchMap.put("eduYear", getCurrentDateTime().substring(0, 4));
            searchMap.put("eduFormType", eduFormType);
            searchMap.put("empSeq", eduInfo.get("REG_EMP_SEQ"));

            int realEduTimeYear = Integer.parseInt(campusRepository.getRealEduTimeYear(searchMap).get("REAL_EDU_TIME2").toString());

            switch (eduFormType){
                case "1":
                    /** 교육기관 참가교육 : 교육시간 100% */
                    realEduTime = eduTime;
                    break;
                case "2":
                    /** 온라인 학습 : 교육시간 100%, 건당 최대 30시간 */
                    if(eduTime > 30){
                        realEduTime = 30;
                    }else{
                        realEduTime = eduTime;
                    }
                    break;
                case "3":
                    /** 세미나/포럼/학술대회 : 주제발표 100%, 단순참가 50%*/
                    String objectForumType = eduInfo.get("OBJECT_FORUM_TYPE") == null ? "" : eduInfo.get("OBJECT_FORUM_TYPE").toString();
                    if(objectForumType.equals("주제발표") || objectForumType == "1"){
                        if(eduTime > 8){
                            realEduTime = 8;
                        }else {
                            realEduTime = eduTime;
                        }
                    }else{
                        if((eduTime/2) > 8){
                            realEduTime = 8;
                        }else {
                            realEduTime = (eduTime/2);
                        }
                    }
                    break;
                case "4":
                    /** 박람회/기술대전 참관 : 건당 최대 4시간 */
                    if(eduTime > 4){
                        realEduTime = 4;
                    }else{
                        realEduTime = eduTime;
                    }
                    break;
                case "5":
                    /** 도서학습 : 50페이지당 1시간, 건당 최대 10시간 */
                    int bookPageVal = eduInfo.get("BOOK_PAGE_VAL") == null ? 0 : Integer.parseInt(eduInfo.get("BOOK_PAGE_VAL").toString());
                    int bookTime = bookPageVal / 50;
                    if(bookTime > 10){
                        realEduTime = 10;
                    }else{
                        realEduTime = bookTime;
                    }
                    break;
                case "6":
                    /** 논문/학술지 독서 : 2편당 1시간 */
                    int treaUnit = eduInfo.get("TREA_UNIT") == null ? 0 : Integer.parseInt(eduInfo.get("TREA_UNIT").toString());
                    if(treaUnit > 1){
                        realEduTime = 1;
                    }else {
                        realEduTime = 0;
                    }
                    break;
                case "7":
                    /** 국내/외 논문 저술 : 국제학술지 저자 20시간, 교신저자 10시간, 국내학술지 저자 10시간, 교신저자 5시간, 연간 최대 30시간 */
                    String treaType = eduInfo.get("TREA_TYPE") == null ? "" : eduInfo.get("TREA_TYPE").toString();
                    String treaUser = eduInfo.get("TREA_USER") == null ? "" : eduInfo.get("TREA_USER").toString();

                    if("국외".equals(treaType)){
                        if("저자".equals(treaUser)){
                            realEduTime = 20;
                        }else{
                            realEduTime = 10;
                        }
                    }else{
                        if("저자".equals(treaUser)){
                            realEduTime = 10;
                        }else{
                            realEduTime = 5;
                        }
                    }
                    if(realEduTimeYear + realEduTime > 30){
                        realEduTime = 30 - realEduTimeYear;
                    }
                    break;
                case "8":
                    /** 직무관련 저술 : 권당 30시간, 연간 최대 50시간*/
                    int bookUnit = eduInfo.get("BOOK_UNIT") == null ? 0 : Integer.parseInt(eduInfo.get("BOOK_UNIT").toString());
                    int bookUnitTime = bookUnit * 30;
                    realEduTime = bookUnitTime;
                    if(realEduTimeYear + realEduTime > 50){
                        realEduTime = 50 - realEduTimeYear;
                    }
                    break;
                case "9":
                    /** 국내외 현장견학 : 1일당 최대 4시간, 건당 최대 30시간 */
                    int termDay = eduInfo.get("TERM_DAY") == null ? 0 : Integer.parseInt(eduInfo.get("TERM_DAY").toString());
                    if(termDay * 4 < eduTime){
                        realEduTime = termDay * 4;
                    }else{
                        realEduTime = eduTime;
                    }
                    break;
                case "10":
                    /** 자격증 취득 : 기술사 30시간, 기사 20시간, 나머지 15시간, 연간 최대 30시간 */
                    String compType = eduInfo.get("COMP_TYPE").toString();
                    if(compType.equals("기술사")){
                        realEduTime = 30;
                    }else if(compType.equals("기사")){
                        realEduTime = 20;
                    }else{
                        realEduTime = 15;
                    }
                    if(realEduTimeYear + realEduTime > 30){
                        realEduTime = 30 - realEduTimeYear;
                    }
                    break;
            }

            params.put("status", "100");
            params.put("realEduTime", realEduTime);
            campusRepository.updateEduResultFinalApprStat(params);
        }
    }

    @Override
    public void updateStudyDocState(Map<String, Object> bodyMap) throws Exception {
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
        params.put("studyInfoSn", approKey);
        params.put("docName", bodyMap.get("formName"));
        params.put("docId", docId);
        params.put("docTitle", bodyMap.get("docTitle"));
        params.put("approveStatCode", docSts);
        params.put("empSeq", empSeq);

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 결재
            params.put("status", "10");
            campusRepository.updateStudyApprStat(params);
        }else if("30".equals(docSts)) { // 반려
            params.put("status", "30");
            campusRepository.updateStudyApprStat(params);
        }else if("40".equals(docSts)) { //회수
            params.put("status", "40");
            campusRepository.updateStudyApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결
            params.put("status", "100");
            campusRepository.updateStudyFinalApprStat(params);
        }
    }

    @Override
    public void updateStudyResDocState(Map<String, Object> bodyMap) throws Exception {
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
        params.put("studyResultSn", approKey);
        params.put("docName", bodyMap.get("formName"));
        params.put("docId", docId);
        params.put("docTitle", bodyMap.get("docTitle"));
        params.put("approveStatCode", docSts);
        params.put("empSeq", empSeq);

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 결재
            params.put("status", "10");
            campusRepository.updateStudyResApprStat(params);
        }else if("30".equals(docSts)) { // 반려
            params.put("status", "30");
            campusRepository.updateStudyResApprStat(params);
        }else if("40".equals(docSts)) { //회수
            params.put("status", "40");
            campusRepository.updateStudyResApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결
            params.put("status", "100");
            campusRepository.updateStudyResFinalApprStat(params);
            params.put("studyResultSn", approKey);
            Map<String, Object> serachMap = campusRepository.getStudyResultData(params);
            params.put("studyInfoSn", serachMap.get("STUDY_INFO_SN"));
            campusRepository.setStudyResultSc(params);
        }
    }

    @Override
    public void updatePropagResDocState(Map<String, Object> bodyMap) throws Exception {
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
        params.put("studyInfoSn", approKey);
        params.put("docName", bodyMap.get("formName"));
        params.put("docId", docId);
        params.put("docTitle", bodyMap.get("docTitle"));
        params.put("approveStatCode", docSts);
        params.put("empSeq", empSeq);

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 결재
            params.put("status", "10");
            campusRepository.updatePropagResApprStat(params);
        }else if("30".equals(docSts)) { // 반려
            params.put("status", "30");
            campusRepository.updatePropagResApprStat(params);
        }else if("40".equals(docSts)) { //회수
            params.put("status", "40");
            campusRepository.updatePropagResApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결
            params.put("status", "100");
            campusRepository.updatePropagResFinalApprStat(params);
            campusRepository.setStudyResultComplete(params);
        }
    }

    @Override
    public void updateOjtResDocState(Map<String, Object> bodyMap) throws Exception {
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
        params.put("studyInfoSn", approKey);
        params.put("docName", bodyMap.get("formName"));
        params.put("docId", docId);
        params.put("docTitle", bodyMap.get("docTitle"));
        params.put("approveStatCode", docSts);
        params.put("empSeq", empSeq);

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 결재
            params.put("status", "10");
            campusRepository.updatePropagResApprStat(params);
        }else if("30".equals(docSts)) { // 반려
            params.put("status", "30");
            campusRepository.updatePropagResApprStat(params);
        }else if("40".equals(docSts)) { //회수
            params.put("status", "40");
            campusRepository.updatePropagResApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결
            params.put("status", "100");
            campusRepository.updatePropagResFinalApprStat(params);
            campusRepository.setStudyResultComplete(params);
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
    public void setStudyResultModify(Map<String, Object> params) {
        campusRepository.setStudyResultModify(params);
    }

    @Override
    public void setStudyResult(Map<String, Object> params) {
        campusRepository.setStudyResult(params);
      /*  campusRepository.setStudyResultComplete(params);*/
    }

    @Override
    public void setOjtOjtResultInsert(Map<String, Object> params) {
        campusRepository.setOjtOjtResultInsert(params);
    }

    @Override
    public void setOjtOjtResultModify(Map<String, Object> params) {
        campusRepository.setOjtOjtResultModify(params);
    }

    @Override
    public void setStudyResultY(Map<String, Object> params) {
        campusRepository.setStudyResultY(params);

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
        campusRepository.deleteOjtUser(params);
    }


    @Override
    public void setStudyResultComplete(Map<String, Object> params) {
        campusRepository.setStudyResultComplete(params);
    }

    //오늘날짜 구하기 yyyyMMddhhmmss
    public static String getCurrentDateTime() {
        Date today = new Date();
        Locale currentLocale = new Locale("KOREAN", "KOREA");
        String pattern = "yyyyMMddHHmmss";
        SimpleDateFormat formatter = new SimpleDateFormat(pattern, currentLocale);
        return formatter.format(today);
    }

    @Override
    public Map<String, Object> getStudyOjtInfoOne(Map<String, Object> params){
        return campusRepository.getStudyOjtInfoOne(params);
    }

    @Override
    public Map<String, Object> getOjtOjtResultCount(Map<String, Object> params){
        return campusRepository.getOjtOjtResultCount(params);
    }

    @Override
    public Map<String, Object> getEmpTeamOrDept(Map<String, Object> params) {
        return campusRepository.getEmpTeamOrDept(params);
    }

    @Override
    public void agreeSubject(Map<String, Object> params) {
        if(params.get("type").equals("ld")){
            campusRepository.agreeLd(params);

            Map<String, Object> paramsMap = new HashMap<>();
            Map<String, Object> sendEmpMap = new HashMap<>();       // 요청자 정보
            Map<String, Object> recieveEmpMap = new HashMap<>();    // 승인자 정보
            sendEmpMap = campusRepository.getEduTargetPkOne(params);
            params.put("frKey", sendEmpMap.get("EDU_TARGET_ID"));
            params.put("type", "목표기술서");

            campusRepository.updPsStatus(params);

            params.put("regEmpSeq", sendEmpMap.get("REG_EMP_SEQ"));

            params.put("type", "ld");
            params.put("dutyCode", "2,3,7");

            recieveEmpMap = campusRepository.getApprEmpInfo(params);

            paramsMap.put("sdEmpSeq", sendEmpMap.get("REG_EMP_SEQ"));           // 요청자 사번
            paramsMap.put("SND_EMP_NM", sendEmpMap.get("REG_EMP_NAME"));        // 요청자 성명
            paramsMap.put("SND_DEPT_SEQ", sendEmpMap.get("REG_DEPT_SEQ"));      // 요청자 부서
            paramsMap.put("SND_DEPT_NM", sendEmpMap.get("REG_DEPT_NAME"));      // 요청자 부서
            paramsMap.put("recEmpSeq", recieveEmpMap.get("EMP_SEQ"));               // 승인자
            paramsMap.put("ntTitle", "[승인요청] 요청자 : " + sendEmpMap.get("REG_EMP_NAME"));     // 제목
            paramsMap.put("ntContent", "[목표기술서] " + sendEmpMap.get("REG_DEPT_NAME") + " - " + sendEmpMap.get("REG_EMP_NAME"));  // 내용
            paramsMap.put("ntUrl", "/process/processCheckList.do?type=process");   // url
            paramsMap.put("frKey", sendEmpMap.get("EDU_TARGET_ID"));   // url
            paramsMap.put("psType", "목표기술서");   // url
            commonRepository.setAlarm(paramsMap);

            paramsMap.put("recEmpSeq", "|" + recieveEmpMap.get("EMP_SEQ") + "|");   // 승인자
            paramsMap.put("ntUrl", "/campus/dutyInfoLeader.do?type=process");       // url
            commonRepository.setPsCheck(paramsMap);

        } else {
            campusRepository.agreeMng(params);

            Map<String, Object> sendEmpMap = new HashMap<>();       // 요청자 정보
            sendEmpMap = campusRepository.getEduTargetPkOne(params);
            params.put("regEmpSeq", sendEmpMap.get("REG_EMP_SEQ"));

            params.put("frKey", sendEmpMap.get("EDU_TARGET_ID"));
            params.put("type", "목표기술서");

            campusRepository.updPsStatus(params);
        }
    }

    @Override
    public void agreeDutySubject(Map<String, Object> params) {
        Map<String, Object> paramsMap = new HashMap<>();

        if(params.get("type").equals("ld")){
            campusRepository.agreeDutyLd(params);

            Map<String, Object> sendEmpMap = new HashMap<>();       // 요청자 정보
            Map<String, Object> recieveEmpMap = new HashMap<>();    // 승인자 정보

            params.put("pk", params.get("dutyInfoSn"));
            sendEmpMap = campusRepository.getDutyInfoOne(params);
            if(sendEmpMap.get("REG_DUTY_CODE").toString().equals("")){  // 승인 요청자가 팀원급일때
                params.put("dutyCode", "2,3,7");
            }
            params.put("regEmpSeq", sendEmpMap.get("REG_EMP_SEQ"));
            recieveEmpMap = campusRepository.getApprEmpInfo(params);

            paramsMap.put("sdEmpSeq", sendEmpMap.get("REG_EMP_SEQ"));           // 요청자 사번
            paramsMap.put("SND_EMP_NM", sendEmpMap.get("REG_EMP_NAME"));        // 요청자 성명
            paramsMap.put("SND_DEPT_SEQ", sendEmpMap.get("REG_DEPT_SEQ"));      // 요청자 부서
            paramsMap.put("SND_DEPT_NM", sendEmpMap.get("REG_DEPT_NAME"));      // 요청자 부서
            paramsMap.put("recEmpSeq", recieveEmpMap.get("EMP_SEQ"));           // 승인자
            paramsMap.put("ntTitle", "[승인요청] 요청자 : " + sendEmpMap.get("REG_EMP_NAME"));     // 제목
            paramsMap.put("ntContent", "[직무기술서] " + sendEmpMap.get("REG_DEPT_NAME") + " - " + sendEmpMap.get("REG_EMP_NAME"));  // 내용
            paramsMap.put("ntUrl", "/process/processCheckList.do?type=process");   // url
            paramsMap.put("frKey", params.get("pk"));
            paramsMap.put("psType", "직무기술서");
            paramsMap.put("type", "직무기술서");
            campusRepository.updPsStatus(paramsMap);
            commonRepository.setAlarm(paramsMap);

            paramsMap.put("recEmpSeq", "|" + recieveEmpMap.get("EMP_SEQ") + "|");   // 승인자
            paramsMap.put("ntUrl", "/campus/dutyInfoLeader.do?type=process");       // url
            commonRepository.setPsCheck(paramsMap);

        } else {
            campusRepository.agreeDutyMng(params);

            paramsMap.put("type", "직무기술서");
            paramsMap.put("frKey", params.get("dutyInfoSn"));
            campusRepository.updPsStatus(paramsMap);
        }
    }

    @Override
    public List<Map<String, Object>> getEduInfoHistList(Map<String, Object> params){
        return prjRepository.getEduInfoHistList(params);
    }

    @Override
    public List<Map<String, Object>> getStudyInfoHistList(Map<String, Object> params){
        return prjRepository.getStudyInfoHistList(params);
    }

    @Override
    public List<Map<String, Object>> getPropagInfoHistList(Map<String, Object> params){
        return prjRepository.getPropagInfoHistList(params);
    }

    @Override
    public List<Map<String, Object>> getOjtInfoHistList(Map<String, Object> params){
        return prjRepository.getOjtInfoHistList(params);
    }

    @Override
    public List<Map<String, Object>> getOpenstudyInfoHistList(Map<String, Object> params){
        return prjRepository.getOpenstudyInfoHistList(params);
    }

    @Override
    public List<Map<String, Object>> getCommonEduInfoHistList(Map<String, Object> params){
        return prjRepository.getCommonEduInfoHistList(params);
    }

    @Override
    public List<Map<String, Object>> getOpenstudyInfoMngHistList(Map<String, Object> params){
        return prjRepository.getOpenstudyInfoMngHistList(params);
    }
}
