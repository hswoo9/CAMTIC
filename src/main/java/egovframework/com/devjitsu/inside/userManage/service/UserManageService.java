package egovframework.com.devjitsu.inside.userManage.service;
import egovframework.com.devjitsu.inside.userManage.service.Impl.UserManageServiceImpl;

import java.util.List;
import java.util.Map;

public interface UserManageService{
    Map<String,Object> getUserPersonnelRecordList (Map<String,Object> map);
    List<Map<String,Object>> getEducationalList (Map<String,Object> map);
    Map<String,Object> getMilitarySvcInfo (Map<String,Object> map);
    Map<String,Object> getMilitaryInfo (Map<String,Object> map);
    List<Map<String,Object>> getCareerInfoList (Map<String,Object> map);
    List<Map<String,Object>> getFamilyInfoList(Map<String,Object> map);
    List<Map<String,Object>> getLicenceInfoList(Map<String,Object> map);
    List<Map<String,Object>> getAppointInfoList (Map<String,Object> map);
    List<Map<String,Object>> getRewardInfoList (Map<String,Object> map);
    List<Map<String,Object>> getAllUserPersonnelRecordList (Map<String,Object> map);
    List<Map<String,Object>> getCodeList();
    List<Map<String,Object>> getDeptCodeList2 (Map<String,Object> params);
    List<Map<String,Object>> getDeptCodeList (Map<String,Object> params);
    List<Map<String,Object>> getEmpInfoList (Map<String,Object> map);
    List<Map<String,Object>> getEmpInfoDetailList(Map<String,Object> map);
    List<Map<String,Object>> getDutyInfoList(Map<String,Object> map);
    List<Map<String,Object>> getProposalInfoList(Map<String,Object> map);
    void setUserReqDetailInsert(Map<String, Object> params);
    void setEducationalInfo (Map<String,Object> map);
    void setCareerInfo (Map<String,Object> map);
    void setMilitaryInfo (Map<String,Object> map);
    void setFmailyInfo (Map<String,Object> map);
    void setLicenceInfo (Map<String,Object> map);
    void setJobInfo (Map<String,Object> map);
    void setAppointingInfo (Map<String,Object> map);
    void setRewardInfo (Map<String,Object> map);
    void setEduInfo (Map<String,Object> map);
    void setWorkEvalInfo (Map<String,Object> map);
    void setProposalInfo (Map<String,Object> map);
    List<Map<String,Object>> getPersonRecordApplyList(Map<String,Object> map);
    List<Map<String,Object>> getPersonRecordApplyList2(Map<String,Object> map);
    void setUpdateUserInfoModY(Map<String,Object> map);
    void setUpdateUserInfoModN(Map<String,Object> map);
	List<Map<String, Object>> getDeptList(Map<String, Object> params);
	void setUpdateUserInfoReturnY(Map<String, Object> map);
	void setUpdateUserInfoReturnN(Map<String, Object> map);
    Map<String,Object> getUserPersonnelinformList (Map<String,Object> params);
    void setUserResignReg(Map<String, Object> params);
    void setUserDel(Map<String, Object> params);
    int setThumbnailUpload(List<Map<String, Object>> list, Map<String, Object> params, String path) throws Exception;

    void setUserInfoReqUpd(Map<String, Object> params);
    Map<String,Object> getUserInfoModDetail(Map<String,Object> map);

    Map<String, Object> getUserImageList(Map<String, Object> params);

    /** 연봉근로계약 */
    List<Map<String,Object>> getEmploymentContList(Map<String,Object> map);
    Map<String,Object> getEmploymentInfo(Map<String,Object> map);
    void setEmploymentContract(Map<String,Object> map);
    void sendSalaryWorkerReq(List<String> params);
    void setEmploymentInfoFlag(Map<String, Object> params);
}
