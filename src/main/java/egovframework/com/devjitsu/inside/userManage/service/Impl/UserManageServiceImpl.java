package egovframework.com.devjitsu.inside.userManage.service.Impl;

import dev_jitsu.MainLib;
import egovframework.com.devjitsu.common.repository.CommonRepository;
import egovframework.com.devjitsu.inside.userManage.repository.UserManageRepository;
import egovframework.com.devjitsu.inside.userManage.service.UserManageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserManageServiceImpl implements UserManageService {
    @Autowired
    private UserManageRepository userManageRepository;

    @Autowired
    private CommonRepository commonRepository;

    @Override
    public Map<String, Object> getUserPersonnelRecordList(Map<String, Object> map) {
        return userManageRepository.getUserPersonnelRecordList(map);
    }
    @Override
    public List<Map<String,Object>> getEducationalList (Map<String,Object> map) {

        List<Map<String,Object>> resultList = userManageRepository.getEducationalList(map);
        if(resultList.size() > 0){
            for(int i = 0 ; i < resultList.size() ; i++){
                Map<String, Object> searchMap = new HashMap<>();
                searchMap.put("fileNo", resultList.get(i).get("GRADE_NO"));
                resultList.get(i).put("gradeFile", commonRepository.getContentFileOne(searchMap));
                searchMap.put("fileNo", resultList.get(i).get("SCORE_NO"));
                resultList.get(i).put("socreFile", commonRepository.getContentFileOne(searchMap));
            }
        }

        return resultList;
    }
    @Override
    public List<Map<String, Object>> getCareerInfoList(Map<String, Object> map) {

        List<Map<String,Object>> resultList = userManageRepository.getCareerInfoList(map);
        if(resultList.size() > 0){
            for(int i = 0 ; i < resultList.size() ; i++){
                Map<String, Object> searchMap = new HashMap<>();
                searchMap.put("fileNo", resultList.get(i).get("ADD_NO"));
                resultList.get(i).put("addFile", commonRepository.getContentFileOne(searchMap));
            }
        }

        return resultList;
    }
    @Override
    public List<Map<String,Object>> getFamilyInfoList(Map<String,Object> map) {
        return userManageRepository.getFamilyInfoList(map);
    }
    @Override
    public List<Map<String,Object>> getLicenceInfoList(Map<String,Object> map) {

        List<Map<String,Object>> resultList = userManageRepository.getLicenceInfoList(map);
        if(resultList.size() > 0){
            for(int i = 0 ; i < resultList.size() ; i++){
                Map<String, Object> searchMap = new HashMap<>();
                searchMap.put("fileNo", resultList.get(i).get("CERTIFICATE_ADD_NO"));
                resultList.get(i).put("certificateAddFile", commonRepository.getContentFileOne(searchMap));
            }
        }

        return resultList;
    }
    @Override
    public List<Map<String,Object>> getAppointInfoList (Map<String,Object> map) {
        return userManageRepository.getAppointInfoList(map);
    }
    @Override
    public List<Map<String,Object>> getRewardInfoList (Map<String,Object> map) {

        List<Map<String,Object>> resultList = userManageRepository.getRewardInfoList(map);
        if(resultList.size() > 0){
            for(int i = 0 ; i < resultList.size() ; i++){
                Map<String, Object> searchMap = new HashMap<>();
                searchMap.put("fileNo", resultList.get(i).get("REWARD_ADD_NO"));
                resultList.get(i).put("rewardAddFile", commonRepository.getContentFileOne(searchMap));
            }
        }

        return resultList;
    }
    @Override
    public Map<String, Object> getMilitarySvcInfo(Map<String, Object> map) {
        return userManageRepository.getMilitarySvcInfo(map);
    }

    @Override
    public Map<String, Object> getMilitaryInfo(Map<String, Object> params) {
        return userManageRepository.getMilitaryInfo(params);
    }

    @Override
    public List<Map<String,Object>> getDeptCodeList2 (Map<String,Object> params) {
        return userManageRepository.getDeptCodeList2(params);
    }

    @Override
    public List<Map<String,Object>> getDeptCodeList (Map<String,Object> params) {
        return userManageRepository.getDeptCodeList(params);
    }

    @Override
    public List<Map<String, Object>> getAllUserPersonnelRecordList(Map<String, Object> map) {
        return userManageRepository.getAllUserPersonnelRecordList(map);
    }
    @Override
    public List<Map<String,Object>> getCodeList() {
        return userManageRepository.getCodeList();
    }
    @Override
    public List<Map<String, Object>> getEmpInfoList(Map<String, Object> map) {

        if(map.containsKey("arr") && !"".equals(map.get("arr").toString())){
            String arrText = map.get("arr").toString();

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
            map.put("arr", arr);
        }

        return userManageRepository.getEmpInfoList(map);
    }
    @Override
    public List<Map<String,Object>> getEmpInfoDetailList(Map<String,Object> map) {

        if(map.get("searchDetail6") != null){
            String[] ar = map.get("searchDetail6").toString().replace("'", "").split(",");
            map.put("sd6_flag", ar.length);

            if(ar.length > 1){
                map.put("searchDetail6_1", ar[0]);
                map.put("searchDetail6_2", ar[1]);
            }
        }

        return userManageRepository.getEmpInfoDetailList(map);
    }
    @Override
    public List<Map<String,Object>> getDutyInfoList(Map<String,Object> map) {
        return userManageRepository.getDutyInfoList(map);
    }
    @Override
    public List<Map<String,Object>> getProposalInfoList(Map<String,Object> map) {
        return userManageRepository.getProposalInfoList(map);
    }

    @Override
    public void setBasicInfo(Map<String, Object> params) {
        userManageRepository.setBasicInfo(params);
    }

    @Override
    public void setUserReqDetailInsert(Map<String, Object> params) {
        userManageRepository.setUserReqDetailInsert(params);
    }

    @Override
    public void setEducationalInfo(Map<String, Object> params, MultipartHttpServletRequest request, String server_dir, String base_dir) {
        userManageRepository.setEducationalInfo(params);

        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        MultipartFile gradeFile = request.getFile("gradeFile");
        MultipartFile socreFile = request.getFile("socreFile");

        if(gradeFile != null){
            if(!gradeFile.isEmpty()){
                fileInsMap = mainLib.fileUpload(gradeFile, filePath(params, server_dir));
                fileInsMap.put("contentId", params.get("educationalId"));
                fileInsMap.put("educationalId", params.get("educationalId"));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, base_dir));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("EMP_SEQ"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("gradeFileNo", fileInsMap.get("file_no"));
                userManageRepository.setInGradeFileNoUpd(fileInsMap);
            }
        }

        if(socreFile != null){
            if(!socreFile.isEmpty()){
                fileInsMap = mainLib.fileUpload(socreFile, filePath(params, server_dir));
                fileInsMap.put("contentId", params.get("educationalId"));
                fileInsMap.put("educationalId", params.get("educationalId"));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, base_dir));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("EMP_SEQ"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("socreFileNo", fileInsMap.get("file_no"));
                userManageRepository.setInScoreFileNoUpd(fileInsMap);
            }
        }
    }

    @Override
    public void setCareerInfo(Map<String, Object> params, MultipartHttpServletRequest request, String server_dir, String base_dir) {
        userManageRepository.setCareerInfo(params);

        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        MultipartFile addFile = request.getFile("addFile");

        if(addFile != null){
            if(!addFile.isEmpty()){
                fileInsMap = mainLib.fileUpload(addFile, filePath(params, server_dir));
                fileInsMap.put("contentId", params.get("careerId"));
                fileInsMap.put("careerId", params.get("careerId"));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, base_dir));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("EMP_SEQ"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("addFileNo", fileInsMap.get("file_no"));
                userManageRepository.setInAddFileNoUpd(fileInsMap);
            }
        }
    }

    /*@Override
    public void setMilitaryInfo(Map<String, Object> map) {
        if(StringUtils.isEmpty(map.get("msiInfoId"))){
            userManageRepository.setMilitaryInfo(map);
        }else{
            userManageRepository.setMilitaryInfoUpd(map);
        }
    }*/

    @Override
    public void setMilitaryInfo(Map<String, Object> params) {
            userManageRepository.setMilitaryInfo(params);
    }

    @Override
    public void setFmailyInfo(Map<String, Object> map) {
        userManageRepository.setFmailyInfo(map);
    }

    @Override
    public void setLicenceInfo(Map<String, Object> params, MultipartHttpServletRequest request, String server_dir, String base_dir) {
        userManageRepository.setLicenceInfo(params);

        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        MultipartFile certificateAddFile = request.getFile("certificateAddFile");

        if(certificateAddFile != null){
            if(!certificateAddFile.isEmpty()){
                fileInsMap = mainLib.fileUpload(certificateAddFile, filePath(params, server_dir));
                fileInsMap.put("contentId", params.get("certificateId"));
                fileInsMap.put("certificateId", params.get("certificateId"));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, base_dir));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("EMP_SEQ"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("certificateFileNo", fileInsMap.get("file_no"));
                userManageRepository.setInCertificateFileNoUpd(fileInsMap);
            }
        }
    }

    @Override
    public void setJobInfo(Map<String, Object> map) {
        userManageRepository.setJobInfo(map);
    }

    @Override
    public void setAppointingInfo(Map<String, Object> map) {
        userManageRepository.setAppointingInfo(map);
    }

    @Override
    public void setRewardInfo(Map<String, Object> params, MultipartHttpServletRequest request, String server_dir, String base_dir) {
        userManageRepository.setRewardInfo(params);

        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        MultipartFile rewardAddFile = request.getFile("rewardAddFile");

        if(rewardAddFile != null){
            if(!rewardAddFile.isEmpty()){
                fileInsMap = mainLib.fileUpload(rewardAddFile, filePath(params, server_dir));
                fileInsMap.put("contentId", params.get("rewordId"));
                fileInsMap.put("rewordId", params.get("rewordId"));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, base_dir));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("EMP_SEQ"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("rewardAddFileNo", fileInsMap.get("file_no"));
                userManageRepository.setInRewardAddFileNoUpd(fileInsMap);
            }
        }
    }

    @Override
    public void setEduInfo(Map<String, Object> map) {
        userManageRepository.setEduInfo(map);
    }

    @Override
    public void setWorkEvalInfo(Map<String, Object> map) {
        userManageRepository.setWorkEvalInfo(map);
    }

    @Override
    public void setProposalInfo(Map<String, Object> map) {
        userManageRepository.setProposalInfo(map);
    }

    private String filePath (Map<String, Object> params, String base_dir){
        LocalDate now = LocalDate.now();
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        String fmtNow = now.format(fmt);

        String path = base_dir + params.get("menuCd").toString()+"/" + fmtNow + "/";

        return path;
    }

    @Override
    public List<Map<String, Object>> getPersonRecordApplyList(Map<String,Object> map) {
        return userManageRepository.getPersonRecordApplyList(map);
    }

    @Override
    public List<Map<String, Object>> getPersonRecordApplyList2(Map<String,Object> map) {
        return userManageRepository.getPersonRecordApplyList2(map);
    }

    @Override
    public void setUpdateUserInfoModY(Map<String,Object> map) {
        userManageRepository.setUpdateUserInfoModY(map);
    }
    @Override
    public void setUpdateUserInfoModN(Map<String,Object> map) {
        userManageRepository.setUpdateUserInfoModN(map);
    }
    @Override
    public void setUpdateUserInfoReturnY(Map<String,Object> map) {
        userManageRepository.setUpdateUserInfoReturnY(map);
    }
    @Override
    public void setUpdateUserInfoReturnN(Map<String,Object> map) {
        userManageRepository.setUpdateUserInfoReturnN(map);
    }

    @Override
    public void setCommissionerPassWdUpd(Map<String, Object> map) {
        userManageRepository.setCommissionerPassWdUpd(map);
    }

    @Override
    public List<Map<String, Object>> getDeptList(Map<String, Object> params){
        return userManageRepository.getDeptList(params);
    }
    @Override
    public Map<String, Object> getUserPersonnelinformList(Map<String, Object> params) {
        return userManageRepository.getUserPersonnelinformList(params);
    }

    @Override
    public Map<String, Object> getUserIdPhotoInfo(Map<String, Object> params) {
        Map<String, Object> infoMap = userManageRepository.getUserImageInfo(params);

        if(infoMap != null){
            params.put("fileNo", infoMap.get("ID_IMAGE_PK"));
        }

        return commonRepository.getContentFileOne(params);
    }

    @Override
    public void setUserResignReg(Map<String, Object> params) {
        userManageRepository.setUserResignReg(params);
    }

    @Override
    public void setUserDel(Map<String, Object> params) {
        userManageRepository.setUserDel(params);
    }

    @Override
    public int setThumbnailUpload(List<Map<String, Object>> list, Map<String, Object> params, String path) throws Exception {
        Map<String, Object> fileParam = new HashMap<>();
        int result = 0;

        for(Map<String, Object> map : list){
            int fileLen = map.get("orgFilename").toString().split("\\.").length;

            String orgFilename = "";
            for(int i = 0 ; i < fileLen - 1 ; i++ ){
                orgFilename = orgFilename + map.get("orgFilename").toString().split("\\.")[i];
            }

            String fileExt = map.get("orgFilename").toString().split("\\.")[fileLen - 1];

            fileParam.put("fileExt", fileExt);
            fileParam.put("fileSize", map.get("fileSize"));
            fileParam.put("fileUUID", map.get("fileUUID"));
            fileParam.put("fileOrgName", orgFilename);

            fileParam.put("fileCd", params.get("menuCd"));
            fileParam.put("filePath", path);
            fileParam.put("empSeq", params.get("empSeq"));

            commonRepository.insOneFileInfo(fileParam);
            result = Integer.parseInt(fileParam.get("file_no").toString());
        }

        return result;
    }

    @Override
    public void setUserInfoReqUpd(Map<String, Object> params) {

        Map<String, Object> infoMap = userManageRepository.getUserImageInfo(params);

        if(infoMap != null){
            userManageRepository.setUserImageUpd(params);   // 업데이트
        } else {
            userManageRepository.setUserImageReq(params);   // 저장
        }
    }
    @Override
    public Map<String,Object> getUserInfoModDetail(Map<String,Object> map) {
        return userManageRepository.getUserInfoModDetail(map);
    }

    @Override
    public Map<String, Object> getKeyInfo(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();
        Map<String, Object> returnMap = userManageRepository.getKeyInfo(params);

        Map<String, Object> searchMap = new HashMap<>();

        /*학력사항 첨부파일*/
        searchMap.put("fileNo", returnMap.get("GRADE_NO"));
        result.put("gradeFile", commonRepository.getContentFileOne(searchMap));
        searchMap.put("fileNo", returnMap.get("SCORE_NO"));
        result.put("socreFile", commonRepository.getContentFileOne(searchMap));

        /*경력사항 첨부파일*/
        searchMap.put("fileNo", returnMap.get("ADD_NO"));
        result.put("addFile", commonRepository.getContentFileOne(searchMap));

        /*보유면허 첨부파일*/
        searchMap.put("fileNo", returnMap.get("CERTIFICATE_ADD_NO"));
        result.put("certificateAddFile", commonRepository.getContentFileOne(searchMap));

        /*상벌사항 첨부파일*/
        searchMap.put("fileNo", returnMap.get("REWARD_ADD_NO"));
        result.put("rewardAddFile", commonRepository.getContentFileOne(searchMap));

        return result;
    }

    @Override
    public Map<String, Object> getUserImageList(Map<String, Object> params) {
        Map<String, Object> resultMap = new HashMap<>();
        Map<String, Object> infoMap = userManageRepository.getUserImageInfo(params);

        if(infoMap != null){
            if(infoMap.get("ID_IMAGE_PK") != "" || infoMap.get("ID_IMAGE_PK") != null){
                params.put("fileNo", infoMap.get("ID_IMAGE_PK"));
                resultMap.put("idImg", commonRepository.getContentFileOne(params));
            }
            if(infoMap.get("SIGN_IMAGE_PK") != "" || infoMap.get("SIGN_IMAGE_PK") != null){
                params.put("fileNo", infoMap.get("SIGN_IMAGE_PK"));
                resultMap.put("signImg", commonRepository.getContentFileOne(params));
            }
            if(infoMap.get("PERSONAL_IMAGE_PK") != "" || infoMap.get("PERSONAL_IMAGE_PK") != null){
                params.put("fileNo", infoMap.get("PERSONAL_IMAGE_PK"));
                resultMap.put("myImg", commonRepository.getContentFileOne(params));
            }
            resultMap.put("null", "");
        } else {
            resultMap.put("null", "");
        }

        return resultMap;
    }


    @Override
    public List<Map<String, Object>> getEmploymentContList(Map<String,Object> map) {
        return userManageRepository.getEmploymentContList(map);
    }
    @Override
    public Map<String,Object> getEmploymentInfo(Map<String,Object> map) {
        return userManageRepository.getEmploymentInfo(map);
    }

    @Override
    public void setEmploymentContract(Map<String, Object> map) {
        userManageRepository.setEmploymentContract(map);
    }

    @Override
    public void sendSalaryWorkerReq(List<String> params) {
        userManageRepository.sendSalaryWorkerReq(params);
    }

    @Override
    public void setEmploymentInfoFlag(Map<String, Object> map) {
        userManageRepository.setEmploymentInfoFlag(map);
    }

    @Override
    public Object updateUserBankInfo(Map<String, Object> params) {
        return userManageRepository.updateUserBankInfo(params);
    }

    @Override
    public Object setUserReqDetailUpdate(Map<String, Object> params) {
        return userManageRepository.setUserReqDetailUpdate(params);
    }

    //인사기록카드 - 삭제할 학력사항 선택

    @Override
    public List<Map<String, Object>> getEduDeleteList(List<Integer> eduChk) {
        return userManageRepository.getEduDeleteList(eduChk);
    }

    //인사기록카드 - 학력사항 삭제 요청 데이터 카피
    @Override
    public void setEduDeleteTmp(Map<String, Object> map) {
            userManageRepository.setEduDeleteTmp(map);

    }
    @Override
    public Map<String, Object> setEduDelete(List<String> eduChk) {
        Map<String, Object> result = new HashMap<>();

        try {
            userManageRepository.setEduDelete(eduChk);

            result.put("code", "200");
            result.put("message", "삭제가 요청되었습니다.");
        }catch (Exception e){
            result.put("code", "500");
            result.put("message", "삭제 요청 중 에러가 발생했습니다.");
        }

        return result;
    }

    //인사기록카드 - 경력사항 삭제
    @Override
    public Map<String, Object> setCareerDelete(List<String> employChk) {
        Map<String, Object> result = new HashMap<>();

        try {
            userManageRepository.setCareerDelete(employChk);

            result.put("code", "200");
            result.put("message", "삭제가 요청되었습니다.");
        }catch (Exception e){
            result.put("code", "500");
            result.put("message", "삭제 요청 중 에러가 발생했습니다.");
        }

        return result;
    }

    //인사기록카드 - 가족사항 삭제
    @Override
    public Map<String, Object> setFamilyDelete(List<String> familyChk) {
        Map<String, Object> result = new HashMap<>();

        try {
            userManageRepository.setFamilyDelete(familyChk);

            result.put("code", "200");
            result.put("message", "삭제가 요청되었습니다.");
        }catch (Exception e){
            result.put("code", "500");
            result.put("message", "삭제 요청 중 에러가 발생했습니다.");
        }

        return result;
    }

    //인사기록카드 - 보유면허 삭제
    @Override
    public Map<String, Object> setLicenseDelete(List<String> certChk) {
        Map<String, Object> result = new HashMap<>();

        try {
            userManageRepository.setLicenseDelete(certChk);

            result.put("code", "200");
            result.put("message", "삭제가 요청되었습니다.");
        }catch (Exception e){
            result.put("code", "500");
            result.put("message", "삭제 요청 중 에러가 발생했습니다.");
        }

        return result;
    }

    //인사기록카드 - 직무사항 삭제
    @Override
    public Map<String, Object> setJobDelete(List<String> dutyInfoChk) {
        Map<String, Object> result = new HashMap<>();

        try {
            userManageRepository.setJobDelete(dutyInfoChk);

            result.put("code", "200");
            result.put("message", "삭제가 요청되었습니다.");
        }catch (Exception e){
            result.put("code", "500");
            result.put("message", "삭제 요청 중 에러가 발생했습니다.");
        }

        return result;
    }

    //인사기록카드 - 상벌사항 삭제
    @Override
    public Map<String, Object> setRewordDelete(List<String> rewordChk) {
        Map<String, Object> result = new HashMap<>();

        try {
            userManageRepository.setRewordDelete(rewordChk);

            result.put("code", "200");
            result.put("message", "삭제가 요청되었습니다.");
        }catch (Exception e){
            result.put("code", "500");
            result.put("message", "삭제 요청 중 에러가 발생했습니다.");
        }

        return result;
    }

    //인사기록카드 - 제안제도 삭제
    @Override
    public Map<String, Object> setProposalDelete(List<String> propChk) {
        Map<String, Object> result = new HashMap<>();

        try {
            userManageRepository.setProposalDelete(propChk);

            result.put("code", "200");
            result.put("message", "삭제가 요청되었습니다.");
        }catch (Exception e){
            result.put("code", "500");
            result.put("message", "삭제 요청 중 에러가 발생했습니다.");
        }

        return result;
    }

    //인사기록카드 수정에 들어갈 항목 조회
    @Override
    public Map<String, Object> getEduinfoList(Map<String, Object> params) {
        return userManageRepository.getEduinfoList(params);
    }

    //상벌사항 수정에 들어갈 항목 조회
    @Override
    public Map<String, Object> getRewinfoList(Map<String, Object> params) {
        return userManageRepository.getRewinfoList(params);
    }

    //제안제도 수정에 들어갈 항목 조회
    @Override
    public Map<String, Object> getProinfoList(Map<String, Object> params) {
        return userManageRepository.getProinfoList(params);
    }

    // 경력사항 수정 항목
    @Override
    public Map<String, Object> getCarinfoList(Map<String, Object> params) {
        return userManageRepository.getCarinfoList(params);
    }

    // 가족사항 수정 항목
    @Override
    public Map<String, Object> getFaminfoList(Map<String, Object> params) {
        return userManageRepository.getFaminfoList(params);
    }
    // 보유면허 수정 항목
    @Override
    public Map<String, Object> getLininfoList(Map<String, Object> params) {
        return userManageRepository.getLininfoList(params);
    }

    // 직무사항 수정 항목
    @Override
    public Map<String, Object> getJobinfoList(Map<String, Object> params) {
        return userManageRepository.getJobinfoList(params);
    }
}
