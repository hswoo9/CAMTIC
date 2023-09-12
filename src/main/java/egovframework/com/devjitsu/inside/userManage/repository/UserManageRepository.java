package egovframework.com.devjitsu.inside.userManage.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class UserManageRepository extends AbstractDAO {
    public Map<String,Object> getUserPersonnelRecordList (Map<String,Object> map) {
        return (Map<String,Object>)selectOne("userManage.getUserPersonnelRecordList", map);
    }
    public List<Map<String,Object>> getEducationalList (Map<String,Object> map) {
        return selectList("userManage.getEducationalList", map);
    }
    public Map<String,Object> getMilitarySvcInfo (Map<String,Object> map) {
        return (Map<String,Object>)selectOne("userManage.getMilitarySvcInfo", map);
    }
    public Map<String,Object> getMilitaryInfo (Map<String,Object> params) {return (Map<String,Object>)selectOne("userManage.getMilitaryInfo", params);}
    public List<Map<String,Object>> getCareerInfoList (Map<String,Object> map) {
        return selectList("userManage.getCareerInfoList", map);
    }
    public List<Map<String,Object>> getAppointInfoList (Map<String,Object> map) {
        return selectList("userManage.getAppointInfoList", map);
    }
    public List<Map<String,Object>> getRewardInfoList (Map<String,Object> map) {
        return selectList("userManage.getRewardInfoList", map);
    }
    public List<Map<String,Object>> getAllUserPersonnelRecordList (Map<String,Object> map) {
        return selectList("userManage.getAllUserPersonnelRecordList", map);
    }
    public List<Map<String,Object>> getCodeList() {
        return selectList("userManage.getCodeList");
    }
    public List<Map<String,Object>> getDeptCodeList2 (Map<String,Object> params) {
        return selectList("userManage.getDeptCodeList2", params);
    }
    public List<Map<String,Object>> getDeptCodeList (Map<String,Object> params) {
        return selectList("userManage.getDeptCodeList", params);
    }
    public List<Map<String,Object>> getEmpInfoList (Map<String,Object> map) {
        return selectList("userManage.getEmpInfoList", map);
    }
    public List<Map<String,Object>> getEmpInfoDetailList(Map<String,Object> map) {
        return selectList("userManage.getEmpInfoDetailList", map);
    }
    public void setUserReqDetailInsert(Map<String, Object> params) {
        insert("userManage.setUserReqDetailInsert", params);
    }
    public void setEducationalInfo (Map<String,Object> map) {
        insert("userManage.setEducationalInfo", map);
    }
    public void setCareerInfo (Map<String,Object> map) {
        insert("userManage.setCareerInfo", map);
    }
    public void setMilitaryInfo (Map<String,Object> map) {insert("userManage.setMilitaryInfo", map);}
    public void setMilitaryInfoUpd (Map<String,Object> map) {insert("userManage.setMilitaryInfoUpd", map);}
    public void setFmailyInfo (Map<String,Object> map) {
        insert("userManage.setFmailyInfo", map);
    }
    public void setLicenceInfo (Map<String,Object> map) {
        insert("userManage.setLicenceInfo", map);
    }
    public void setJobInfo (Map<String,Object> map) {
        insert("userManage.setJobInfo", map);
    }
    public void setAppointingInfo (Map<String,Object> map) {
        insert("userManage.setAppointingInfo", map);
    }
    public void setRewardInfo (Map<String,Object> map) {
        insert("userManage.setRewardInfo", map);
    }
    public void setEduInfo (Map<String,Object> map) {
        insert("userManage.setEduInfo", map);
    }
    public void setWorkEvalInfo (Map<String,Object> map) {
        insert("userManage.setWorkEvalInfo", map);
    }
    public void setProposalInfo (Map<String,Object> map) {
        insert("userManage.setProposalInfo", map);
    }
    public List<Map<String,Object>> getPersonRecordApplyList(Map<String,Object> map) {
        return selectList("userManage.getPersonRecordApplyList", map);
    }
    public List<Map<String,Object>> getPersonRecordApplyList2(Map<String,Object> map) {
        return selectList("userManage.getPersonRecordApplyList2", map);
    }
    public List<Map<String,Object>> getFamilyInfoList(Map<String,Object> map) {
        return selectList("userManage.getFamilyInfoList", map);
    }
    public List<Map<String,Object>> getLicenceInfoList(Map<String,Object> map) {
        return selectList("userManage.getLicenceInfoList", map);
    }
    public void setUpdateUserInfoModY(Map<String,Object> map) {
        update("userManage.setUpdateUserInfoModY", map);
    }
    public void setUpdateUserInfoModN(Map<String,Object> map) {
        update("userManage.setUpdateUserInfoModN", map);
    }
    public List<Map<String,Object>> getDutyInfoList(Map<String,Object> map) {
        return selectList("userManage.getDutyInfoList", map);
    }
    public List<Map<String,Object>> getProposalInfoList(Map<String,Object> map) {
        return selectList("userManage.getProposalInfoList", map);
    }
	public List<Map<String, Object>> getDeptList(Map<String, Object> params) {
		return selectList("userManage.getDeptList", params);
	}
	public void setUpdateUserInfoReturnY(Map<String, Object> map) {
		update("userManage.setUpdateUserInfoReturnY", map);
	}
	public void setUpdateUserInfoReturnN(Map<String, Object> map) {
		update("userManage.setUpdateUserInfoReturnN", map);
		
	}
    public Map<String,Object> getUserPersonnelinformList (Map<String,Object> params) {
        return (Map<String,Object>)selectOne("userManage.getUserPersonnelinformList", params);
    }
    public void setUserResignReg(Map<String, Object> params){ update("userManage.setUserResignReg", params);}
    public void setUserDel(Map<String, Object> params){ update("userManage.setUserDel", params);}
    public void setUserInfoReqUpd(Map<String, Object> params) { insert("userManage.setUserInfoReqUpd", params);}
    public Map<String,Object> getUserInfoModDetail(Map<String,Object> map) {
        return (Map<String,Object>) selectOne("userManage.getUserInfoModDetail", map);
    }

    /** 이미지 관리 */
    public Map<String, Object> getUserImageInfo(Map<String, Object> map){ return (Map<String, Object>) selectOne("userManage.getUserImageInfo", map); }
    public void setUserImageReq(Map<String, Object> params) { insert("userManage.setUserImageReq", params); }
    public void setUserImageUpd(Map<String, Object> params) { update("userManage.setUserImageUpd", params); }

    /** 연봉근로계약 */
    public List<Map<String,Object>> getEmploymentContList(Map<String,Object> map) {return selectList("employM.getEmploymentContList", map);}
    public Map<String,Object> getEmploymentInfo(Map<String,Object> map) {return (Map<String,Object>) selectOne("employM.getEmploymentInfo", map);}
    public void setEmploymentContract(Map<String, Object> params){ insert("employM.setEmploymentContract", params);}
    public void sendSalaryWorkerReq(List<String> params){ insert("employM.sendSalaryWorkerReq", params);}
    public void setEmploymentInfoFlag(Map<String, Object> params){ insert("employM.setEmploymentInfoFlag", params);}

    public Object updateUserBankInfo(Map<String, Object> params) {
        return update("employM.updateUserBankInfo", params);
    }

    public Object setUserReqDetailUpdate(Map<String, Object> params) {
        return update("userManage.setUserReqDetailUpdate", params);
    }
    public void setBasicInfo(Map<String, Object> params) { update("userManage.setBasicInfo", params);}

    //인사기록카드 - 학력사항 삭제
    public void setEduDelete(List<String> eduChk) { update("userManage.setEduDelete", eduChk);}

    //인사기록카드 - 경력사항 삭제
    public void setCareerDelete(List<String> employChk) { update("userManage.setCareerDelete", employChk);}

    //인사기록카드 - 가족사항 삭제
    public void setFamilyDelete(List<String> familyChk) { update("userManage.setFamilyDelete", familyChk);}

    //인사기록카드 - 보유면허 삭제
    public void setLicenseDelete(List<String> certChk) { update("userManage.setLicenseDelete", certChk);}

    //인사기록카드 - 직무사항 삭제
    public void setJobDelete(List<String> dutyInfoChk) { update("userManage.setJobDelete", dutyInfoChk);}

    //인사기록카드 - 상벌사항 삭제
    public void setRewordDelete(List<String> rewordChk) { update("userManage.setRewordDelete", rewordChk);}

    //인사기록카드 - 제안제도 삭제
    public void setProposalDelete(List<String> propChk) { update("userManage.setProposalDelete", propChk);}

    //인사기록카드 수정에 들어갈 항목 조회
    public Map<String,Object> getEduinfoList (Map<String,Object> params) {
        return (Map<String,Object>)selectOne("userManage.getEduinfoList", params);
    }
    //학력 사항 첨부파일 등록
    public void setInGradeFileNoUpd(Map<String, Object> params) { insert("userManage.setInGradeFileNoUpd", params);}

    public void setInScoreFileNoUpd(Map<String, Object> params) { insert("userManage.setInScoreFileNoUpd", params);}

    //경력 사항 첨부파일 등록
    public void setInAddFileNoUpd(Map<String, Object> params) { insert("userManage.setInAddFileNoUpd", params);}

    //보유 면허 첨부파일 등록
    public void setInCertificateFileNoUpd(Map<String, Object> params) { insert("userManage.setInCertificateFileNoUpd", params);}
    
    //상벌 사항 첨부파일 등록
    public void setInRewardAddFileNoUpd(Map<String, Object> params) { insert("userManage.setInRewardAddFileNoUpd", params);}

}
