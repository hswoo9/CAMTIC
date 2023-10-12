package egovframework.com.devjitsu.inside.userManage.service;
import egovframework.com.devjitsu.inside.userManage.service.Impl.UserManageServiceImpl;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.List;
import java.util.Map;

public interface UserManageService{
    Map<String,Object>getUserPersonnelRecordList (Map<String,Object> map);
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
    void setBasicInfo(Map<String, Object> params);
    void setUserReqDetailInsert(Map<String, Object> params);
    void setEducationalInfo (Map<String, Object> params, MultipartHttpServletRequest request, String server_dir, String base_dir);
    void setCareerInfo (Map<String, Object> params, MultipartHttpServletRequest request, String server_dir, String base_dir);
    void setMilitaryInfo (Map<String,Object> map);
    void setFmailyInfo (Map<String,Object> map);
    void setLicenceInfo (Map<String, Object> params, MultipartHttpServletRequest request, String server_dir, String base_dir);
    void setJobInfo (Map<String,Object> map);
    void setAppointingInfo (Map<String,Object> map);
    void setRewardInfo (Map<String,Object> params, MultipartHttpServletRequest request, String server_dir, String base_dir);
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
    void setCommissionerPassWdUpd(Map<String, Object> map);
    Map<String,Object> getUserPersonnelinformList (Map<String,Object> params);
    Map<String, Object> getUserIdPhotoInfo(Map<String, Object> params);
    void setUserResignReg(Map<String, Object> params);
    void setUserDel(Map<String, Object> params);
    int setThumbnailUpload(List<Map<String, Object>> list, Map<String, Object> params, String path) throws Exception;

    void setUserInfoReqUpd(Map<String, Object> params);
    Map<String,Object> getUserInfoModDetail(Map<String,Object> map);

    Map<String, Object> getKeyInfo(Map<String, Object> params);

    Map<String, Object> getUserImageList(Map<String, Object> params);

    /** 연봉근로계약 */
    List<Map<String,Object>> getEmploymentContList(Map<String,Object> map);
    Map<String,Object> getEmploymentInfo(Map<String,Object> map);
    void setEmploymentContract(Map<String,Object> map);
    void sendSalaryWorkerReq(List<String> params);
    void setEmploymentInfoFlag(Map<String, Object> params);

    Object updateUserBankInfo(Map<String, Object> params);

    Object setUserReqDetailUpdate(Map<String, Object> params);

    /** 인사기록카드 - 학력사항 삭제*/
    Map<String, Object> setEduDelete(List<String> eduChk);

    /**인사기록카드 - 삭제할 학력사항 선택*/
    List<Map<String, Object>> getEduDeleteList(List<Integer> eduChk);

    /**인사기록카드 - 학력사항 삭제 요청 데이터 카피*/
    void setEduDeleteTmp(Map<String, Object> map);

    /**인사기록카드 - 삭제할 경력사항 선택*/
    List<Map<String,Object>> getCareerDeleteList(List<Integer> employChk);

    /**인사기록카드 - 경력사항 삭제 요청 카피 데이터*/
    void setCareerDeleteTmp(Map<String,Object> map);

    /** 인사기록카드 - 경력사항 삭제*/
    Map<String, Object> setCareerDelete(List<String> employChk);

    /** 인사기록카드 - 가족사항 삭제*/
    Map<String, Object> setFamilyDelete(List<String> familyChk);

    /**인사기록카드 - 삭제할 가족사항 선택*/
    List<Map<String, Object>> getFamilyDeleteList(List<Integer> familyChk);

    /**인사기록카드 - 가족사항 삭제 요청 데이터 카피*/
    void setFamilyDeleteTmp(Map<String, Object> map);

    /** 인사기록카드 - 보유면허 삭제*/
    Map<String, Object> setLicenseDelete(List<String> certChk);

    /** 인사기록카드 - 삭제할 보유면허 선택*/
    List<Map<String,Object>> getLicenseDeleteList(List<Integer> certChk);

    /** 인사기록카드 - 보유면허 삭제 요청 데이터 카피*/
    void setLicenseDeleteTmp(Map<String, Object> map);

    /** 인사기록카드 - 직무사항 삭제*/
    Map<String, Object> setJobDelete(List<String> dutyInfoChk);

    /** 인사기록카드 - 삭제할 직무사항 선택*/
    List<Map<String,Object>> getJobDeleteList(List<Integer> dutyInfoChk);

    /** 인사기록카드 - 직무사항 삭제 요청 데이터 카피*/
    void setJobDeleteTmp(Map<String,Object> map);

    /** 인사기록카드 - 상벌사항 삭제*/
    Map<String, Object> setRewordDelete(List<String> rewordChk);

    /**인사기록카드 - 삭제할 상벌사항 선택*/
    List<Map<String,Object>> getRewordDeleteList(List<Integer> rewordChk);

    /**인사기록카드 - 상벌사항 삭제 요청 카피 데이터*/
    void setRewordDeleteTmp(Map<String,Object> map);

    /** 인사기록카드 - 제안제도 삭제*/
    Map<String, Object> setProposalDelete(List<String> propChk);

    /**인사기록카드 - 삭제할 제안제도 선택*/
    List<Map<String,Object>> getProposalDeleteList (List<Integer> propChk);

    /**인사기록카드 - 제안제도 삭제 요청 카피 데이터*/
    void setProposalDeleteTmp(Map<String,Object> map);

    /**
     * 인사기록카드 수정에 들어갈 항목 조회
     * */
    Map<String,Object> getEduinfoList (Map<String,Object> params);
    /** 상벌사항 수정 내용 **/
    Map<String,Object> getRewinfoList (Map<String,Object> params);
    /** 제안제도 수정 내용 **/
    Map<String,Object> getProinfoList (Map<String,Object> params);
    /** 경력사항 수정 내용 **/
    Map<String,Object> getCarinfoList (Map<String,Object> params);

    /** 가족사항 수정 내용 **/
    Map<String,Object> getFaminfoList (Map<String,Object> params);

    /** 보유면허 수정 내용 **/
    Map<String,Object> getLininfoList (Map<String,Object> params);

    /** 직무사항 수정 내용 **/
    Map<String,Object> getJobinfoList (Map<String,Object> params);

}
