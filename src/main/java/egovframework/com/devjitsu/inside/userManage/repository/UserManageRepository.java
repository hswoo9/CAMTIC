package egovframework.com.devjitsu.inside.userManage.repository;

import egovframework.com.devjitsu.main.repository.AbstractDAO;
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
    public void setMilitaryInfo (Map<String,Object> map) {
        insert("userManage.setMilitaryInfo", map);
    }
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
}
