package egovframework.com.devjitsu.inside.userManage.service.Impl;

import egovframework.com.devjitsu.common.repository.CommonRepository;
import egovframework.com.devjitsu.inside.userManage.repository.UserManageRepository;
import egovframework.com.devjitsu.inside.userManage.service.UserManageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

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
        return userManageRepository.getEducationalList(map);
    }
    @Override
    public List<Map<String, Object>> getCareerInfoList(Map<String, Object> map) {
        return userManageRepository.getCareerInfoList(map);
    }
    @Override
    public List<Map<String,Object>> getFamilyInfoList(Map<String,Object> map) {
        return userManageRepository.getFamilyInfoList(map);
    }
    @Override
    public List<Map<String,Object>> getLicenceInfoList(Map<String,Object> map) {
        return userManageRepository.getLicenceInfoList(map);
    }
    @Override
    public List<Map<String,Object>> getAppointInfoList (Map<String,Object> map) {
        return userManageRepository.getAppointInfoList(map);
    }
    @Override
    public List<Map<String,Object>> getRewardInfoList (Map<String,Object> map) {
        return userManageRepository.getRewardInfoList(map);
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

        if(map.containsKey("arr")){
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
    public void setUserReqDetailInsert(Map<String, Object> params) {
        userManageRepository.setUserReqDetailInsert(params);
    }

    @Override
    public void setEducationalInfo(Map<String, Object> map) {
        userManageRepository.setEducationalInfo(map);
    }

    @Override
    public void setCareerInfo(Map<String, Object> map) {
        userManageRepository.setCareerInfo(map);
    }

    @Override
    public void setMilitaryInfo(Map<String, Object> map) {
        if(StringUtils.isEmpty(map.get("msiInfoId"))){
            userManageRepository.setMilitaryInfo(map);
        }else{
            userManageRepository.setMilitaryInfoUpd(map);
        }
    }

    @Override
    public void setFmailyInfo(Map<String, Object> map) {
        userManageRepository.setFmailyInfo(map);
    }

    @Override
    public void setLicenceInfo(Map<String, Object> map) {
        userManageRepository.setLicenceInfo(map);
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
    public void setRewardInfo(Map<String, Object> map) {
        userManageRepository.setRewardInfo(map);
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

    /** 인사기록카드 포상 관리 추가*/
    @Override
    public List<Map<String,Object>> getReward2InfoList (Map<String,Object> map) {
        return userManageRepository.getReward2InfoList(map);
    }

}
