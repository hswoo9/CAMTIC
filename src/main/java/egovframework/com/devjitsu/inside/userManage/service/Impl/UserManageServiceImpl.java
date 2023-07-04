package egovframework.com.devjitsu.inside.userManage.service.Impl;

import egovframework.com.devjitsu.inside.userManage.repository.UserManageRepository;
import egovframework.com.devjitsu.inside.userManage.service.UserManageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class UserManageServiceImpl implements UserManageService {
    @Autowired
    private UserManageRepository userManageRepository;
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

        if(map.containsKey("dtArr")){
            String arrText = map.get("dtArr").toString();

            String[] arr = arrText.split(",");

            if(arrText != ""){
                map.put("arr", arr);
            } else {
                map.put("arr", "");
            }
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
        userManageRepository.setMilitaryInfo(map);
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
}
