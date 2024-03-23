package egovframework.com.devjitsu.inside.userManage.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
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
        List<String> searchDetail3 = new ArrayList<>();
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
   /* public void setMilitaryInfoUpd (Map<String,Object> map) {insert("userManage.setMilitaryInfoUpd", map);}*/
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

    //인사관리


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
    public Map<String,Object> getStudyInfoList(Map<String,Object> map) {
        return (Map<String, Object>) selectOne("userManage.getStudyInfoList", map);
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
    public void setCommissionerPassWdUpd(Map<String, Object> map) {
        update("userManage.setCommissionerPassWdUpd", map);
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

    public Map<String, Object> getKeyInfo(Map<String,Object> params) { return (Map<String, Object>) selectOne("userManage.getKeyInfo", params);}

    /** 이미지 관리 */
    public Map<String, Object> getUserImageInfo(Map<String, Object> map){ return (Map<String, Object>) selectOne("userManage.getUserImageInfo", map); }
    public void setUserImageReq(Map<String, Object> params) { insert("userManage.setUserImageReq", params); }
    public void setUserImageUpd(Map<String, Object> params) { update("userManage.setUserImageUpd", params); }

    /** 연봉근로계약 */
    public List<Map<String,Object>> getEmploymentContList(Map<String,Object> map) {return selectList("employM.getEmploymentContList", map);}
    public List<Map<String,Object>> employmentExcelEmpList(Map<String,Object> map) {return selectList("employM.employmentExcelEmpList", map);}
    public Map<String,Object> getEmploymentInfo(Map<String,Object> map) {return (Map<String,Object>) selectOne("employM.getEmploymentInfo", map);}
    public void setEmploymentContract(Map<String, Object> params){ insert("employM.setEmploymentContract", params);}
    public void sendSalaryWorkerReq(List<String> params){ insert("employM.sendSalaryWorkerReq", params);}
    public void setSalaryContractDel(Map<String, Object> params) { update("employM.setSalaryContractDel", params);}
    public void setEmploymentInfoFlag(Map<String, Object> params){ insert("employM.setEmploymentInfoFlag", params);}

    public Object updateUserBankInfo(Map<String, Object> params) {
        return update("employM.updateUserBankInfo", params);
    }

    public Object setUserReqDetailUpdate(Map<String, Object> params) {
        return update("userManage.setUserReqDetailUpdate", params);
    }
    public void setBasicInfo(Map<String, Object> params) { update("userManage.setBasicInfo", params);}

    //인사기록카드 - 삭제할 학력사항 선택
    public List<Map<String,Object>> getEduDeleteList(List<Integer> eduChk) {
        return selectList("userManage.getEduDeleteList", eduChk);
    }

    //인사기록카드 - 학력사항 삭제 요청 데이터 카피
    public void setEduDeleteTmp (Map<String,Object> map) {
        insert("userManage.setEduDeleteTmp", map);
    }

    //인사기록카드 - 학력사항 삭제
    public void setEduDelete(List<String> eduChk) {update("userManage.setEduDelete", eduChk);}

    //인사기록카드 - 삭제할 경력사항 선택
    public List<Map<String,Object>> getCareerDeleteList(List<Integer> employChk){
        return selectList("userManage.getCareerDeleteList",employChk);
    }

    //인사기록카드 - 경력사항 삭제 요청 데이터 카피
    public void setCareerDeleteTmp(Map<String,Object> map){insert("userManage.setCareerDeleteTmp",map);}

    //인사기록카드 - 경력사항 삭제
    public void setCareerDelete(List<String> employChk) { update("userManage.setCareerDelete", employChk);}

    //인사기록카드 - 삭제할 가족사항 선택
    public List<Map<String,Object>> getFamilyDeleteList(List<Integer> familyChk){
        return selectList("userManage.getFamilyDeleteList", familyChk);
    }

    //인사기록카드 - 가족사항 삭제 요청 데이터 카피
    public void setFamilyDeleteTmp (Map<String,Object> map){
        insert("userManage.setFamilyDeleteTmp", map);
    }

    //인사기록카드 - 가족사항 삭제
    public void setFamilyDelete(List<String> familyChk) { update("userManage.setFamilyDelete", familyChk);}

    //인사기록카드 - 삭제할 보유면허 선택
    public List<Map<String,Object>> getLicenseDeleteList(List<Integer> certChk){
        return selectList("userManage.getLicenseDeleteList", certChk);
    }

    //인사기록카드 - 보유면허 삭제 요청 데이터 카피
    public void setLicenseDeleteTmp (Map<String,Object> map) {insert("userManage.setLicenseDeleteTmp", map);}

    //인사기록카드 - 보유면허 삭제
    public void setLicenseDelete(List<String> certChk) { update("userManage.setLicenseDelete", certChk);}

    //인사기록카드 - 삭제할 직무사항 선택
    public List<Map<String,Object>> getJobDeleteList(List<Integer> dutyInfoChk){
        return selectList("userManage.getJobDeleteList", dutyInfoChk);
    }

    //인사기록카드 - 직무사항 삭제 요청 데이터 카피
    public void setJobDeleteTmp(Map<String,Object> map){insert("userManage.setJobDeleteTmp", map);}

    //인사기록카드 - 직무사항 삭제
    public void setJobDelete(List<String> dutyInfoChk) { update("userManage.setJobDelete", dutyInfoChk);}

    //인사기록카드 - 삭제할 상벌사항 선택
    public List<Map<String,Object>> getRewordDeleteList(List<Integer> rewordChk){
        return selectList("userManage.getRewordDeleteList",rewordChk);
    }

    //인사기록카드 - 상벌사항 삭제 요청 데이터 카피
    public void setRewordDeleteTmp(Map<String,Object> map){insert("userManage.setRewordDeleteTmp",map);}

    //인사기록카드 - 상벌사항 삭제
    public void setRewordDelete(List<String> rewordChk) { update("userManage.setRewordDelete", rewordChk);}

    //인사기록카드 - 삭제할 제안제도 선택
    public List<Map<String,Object>> getProposalDeleteList (List<Integer> propChk){
        return selectList("userManage.getProposalDeleteList",propChk);
    }

    //인사기록카드 - 제안제도 삭제 요청 데이터 카피
    public void setProposalDeleteTmp(Map<String,Object> map){ insert("userManage.setProposalDeleteTmp",map);}

    //인사기록카드 - 제안제도 삭제
    public void setProposalDelete(List<String> propChk) { update("userManage.setProposalDelete", propChk);}

    //인사기록카드 수정에 들어갈 항목 조회
    public Map<String,Object> getEduinfoList (Map<String,Object> params) {
        return (Map<String,Object>)selectOne("userManage.getEduinfoList", params);
    }
    //상벌사항 수정에 들어갈 항목 조회
    public Map<String,Object> getRewinfoList (Map<String,Object> params) {
        return (Map<String,Object>)selectOne("userManage.getRewinfoList", params);
    }
    //제안제도 수정에 들어갈 항목 조회
    public Map<String,Object> getProinfoList (Map<String,Object> params) {
        return (Map<String,Object>)selectOne("userManage.getProinfoList", params);
    }
    //경력사항 수정 항목
    public Map<String,Object> getCarinfoList (Map<String,Object> params) {
        return (Map<String,Object>)selectOne("userManage.getCarinfoList", params);
    }
    //가족사항 수정 항목
    public Map<String,Object> getFaminfoList (Map<String,Object> params) {
        return (Map<String,Object>)selectOne("userManage.getFaminfoList", params);
    }
    //보유면허 수정 항목
    public Map<String,Object> getLininfoList (Map<String,Object> params) {
        return (Map<String,Object>)selectOne("userManage.getLininfoList", params);
    }
    //직무사항 수정 항목
    public Map<String,Object> getJobinfoList (Map<String,Object> params) {
        return (Map<String,Object>)selectOne("userManage.getJobinfoList", params);
    }
    //학력 사항 첨부파일 등록
    public void setInGradeFileNoUpd(Map<String, Object> params) { insert("userManage.setInGradeFileNoUpd", params);}

    public void setInScoreFileNoUpd(Map<String, Object> params) { insert("userManage.setInScoreFileNoUpd", params);}

    //경력 사항 첨부파일 등록
    public void setInAddFileNoUpd(Map<String, Object> params) { insert("userManage.setInAddFileNoUpd", params);}

    //보유 면허 첨부파일 등록
    public void setInCertificateFileNoUpd(Map<String, Object> params) { insert("userManage.setInCertificateFileNoUpd", params);}
    
    //상벌 사항 첨부파일 등록
    public void setInRewardAddFileNoUpd(Map<String, Object> params) { insert("userManage.setInRewardAddFileNoUpdAdmin", params);}


    // 관리자 학력 사항 첨부파일 등록
    public void setInGradeFileNoUpdAdmin(Map<String, Object> params) { insert("userManage.setInGradeFileNoUpdAdmin", params);}

    public void setInScoreFileNoUpdAdmin(Map<String, Object> params) { insert("userManage.setInScoreFileNoUpdAdmin", params);}

    // 관리자 경력 사항 첨부파일 등록
    public void setInAddFileNoUpdAdmin(Map<String, Object> params) { insert("userManage.setInAddFileNoUpdAdmin", params);}

    // 관리자 보유 면허 첨부파일 등록
    public void setInCertificateFileNoUpdAdmin(Map<String, Object> params) { insert("userManage.setInCertificateFileNoUpdAdmin", params);}

    // 관리자 상벌 사항 첨부파일 등록
    public void setInRewardAddFileNoUpdAdmin(Map<String, Object> params) { insert("userManage.setInRewardAddFileNoUpdAdmin", params);}

    //직원 생일 리스트
    public List<Map<String,Object>> getEmpBirthDayInfoList (Map<String,Object> map) {
        return selectList("userManage.getEmpBirthDayInfoList", map);
    }

    public Map<String, Object> getEmpInfo(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("userManage.getEmpInfo", params);
    }
    public int getCountForDsA() {return (Integer) selectOne("userManage.getCountForDsA");}
    public int getCountForDsB() {return (Integer) selectOne("userManage.getCountForDsB");}
    public int getCountForDsC() {return (Integer) selectOne("userManage.getCountForDsC");}
    public int getCountForDsD() {return (Integer) selectOne("userManage.getCountForDsD");}
    public int getCountForDsE() {return (Integer) selectOne("userManage.getCountForDsE");}
    public int getCountForDsF() {return (Integer) selectOne("userManage.getCountForDsF");}
    public int getCountForDsG() {return (Integer) selectOne("userManage.getCountForDsG");}
    public int getCountForDsH() {return (Integer) selectOne("userManage.getCountForDsH");}
    public int getCountForDsI(Map<String, Object> params) {return (Integer) selectOne("userManage.getCountForDsI", params);}
    public int getCountForDsJ() {return (Integer) selectOne("userManage.getCountForDsJ");}





    public int getCountForDsA2() {return (Integer) selectOne("userManage.getCountForDsA2");}
    public int getCountForDsB2() {return (Integer) selectOne("userManage.getCountForDsB2");}
    public int getCountForDsC2() {return (Integer) selectOne("userManage.getCountForDsC2");}
    public int getCountForDsD2() {return (Integer) selectOne("userManage.getCountForDsD2");}
    public int getCountForDsE2() {return (Integer) selectOne("userManage.getCountForDsE2");}
    public int getCountForDsF2() {return (Integer) selectOne("userManage.getCountForDsF2");}
    public int getCountForDsG2() {return (Integer) selectOne("userManage.getCountForDsG2");}
    public int getCountForDsH2() {return (Integer) selectOne("userManage.getCountForDsH2");}
    public int getCountForDsI2() {return (Integer) selectOne("userManage.getCountForDsI2");}
    public int getCountForDsJ2() {return (Integer) selectOne("userManage.getCountForDsJ2");}

    public void userDegreeInfoInsert(Map<String, Object> map) {insert("userManage.userDegreeInfoInsert", map);}
    public void userDegreeInfoModify (Map<String,Object> map) {update("userManage.userDegreeInfoModify", map);}
    public void userDegreeInfoDelete(Map<String, Object> params) { update("userManage.userDegreeInfoDelete", params);}

    public void userCareerInfoInsert(Map<String, Object> map) {insert("userManage.userCareerInfoInsert", map);}
    public void userCareerInfoModify (Map<String,Object> map) {update("userManage.userCareerInfoModify", map);}
    public void userCareerInfoDelete(Map<String, Object> params) { update("userManage.userCareerInfoDelete", params);}

    public void userMilitaryInfoModify(Map<String, Object> params) {update("userManage.userMilitaryInfoModify", params);}

    public void userFamilyInfoInsert(Map<String, Object> map) {insert("userManage.userFamilyInfoInsert", map);}
    public void userFamilyInfoModify (Map<String,Object> map) {update("userManage.userFamilyInfoModify", map);}
    public void userFamilyInfoDelete(Map<String, Object> params) { update("userManage.userFamilyInfoDelete", params);}

    public void userLinInfoInsert(Map<String, Object> map) {insert("userManage.userLinInfoInsert", map);}
    public void userLinInfoModify (Map<String,Object> map) {update("userManage.userLinInfoModify", map);}
    public void userLinInfoDelete(Map<String, Object> params) { update("userManage.userLinInfoDelete", params);}

    public void userJobInfoInsert(Map<String, Object> map) {insert("userManage.userJobInfoInsert", map);}
    public void userJobInfoModify (Map<String,Object> map) {
        update("userManage.userJobInfoModify", map);
    }
    public void userJobInfoDelete(Map<String, Object> params) { update("userManage.userJobInfoDelete", params);}

    public void userRewInfoInsert(Map<String, Object> map) {insert("userManage.userRewInfoInsert", map);}
    public void userRewInfoModify (Map<String,Object> map) {update("userManage.userRewInfoModify", map);}
    public void userRewInfoDelete(Map<String, Object> params) { update("userManage.userRewInfoDelete", params);}
    public void setCardEtc(Map<String, Object> params) { update("userManage.setCardEtc", params);}






    public List<Map<String, Object>> getTotalEmpCount(Map<String, Object> params){
        return selectList("userManage.getTotalEmpCount", params);
    }

    public List<Map<String, Object>> getJoinResignEmpList(Map<String, Object> params){
        return selectList("userManage.getJoinResignEmpList", params);
    }


    public List<Map<String, Object>> getDeptEmpCount(Map<String, Object> params){
        return selectList("userManage.getDeptEmpCount",params);
    }

    public List<Map<String, Object>> getTeamEmpCount(Map<String, Object> params){
        return selectList("userManage.getTeamEmpCount",params);
    }

    /**년도별 직급 현황**/
    public List<Map<String, Object>> getPositionNameByYear(Map<String, Object> params){
        return selectList("userManage.getPositionNameByYear", params);
    }

    /**년도별 직급 현황 팝업**/
    public List<Map<String, Object>> getPositionListByYear(Map<String, Object> params){
        return selectList("userManage.getPositionListByYear", params);
    }

    /** 년도별 발령 현황 **/
    public List<Map<String, Object>> getApntNameByYear(Map<String, Object> params){
        return selectList("userManage.getApntNameByYear", params);
    }

    /** 년도별 발령 현황 팝업 **/
    public List<Map<String, Object>> getApntListByYear(Map<String, Object> params){
        return selectList("userManage.getApntListByYear", params);
    }

    /**직급 현황**/
    public List<Map<String, Object>> getEmpCountsByPosition(Map<String, Object> params){
        return selectList("userManage.getEmpCountsByPosition",params);
    }
    /** 성별/연령별 현황 **/
    public List<Map<String, Object>> getGenderCount(Map<String, Object> params){
        return selectList("userManage.getGenderCount", params);
    }
    public List<Map<String, Object>> getAgeCount(Map<String, Object> params){
        return selectList("userManage.getAgeCount", params);
    }

    /** 학위별 현황 **/
    public List<Map<String, Object>> getDegreeCount(Map<String, Object> params){
        return selectList("userManage.getDegreeCount", params);
    }

    /** 소속 현황(부서) 팝업 **/
    public List<Map<String, Object>> getDeptListByCount(Map<String, Object> params){
        return selectList("userManage.getDeptListByCount", params);
    }

    /** 소속 현황(팀) 팝업 **/
    public List<Map<String, Object>> getTeamListByCount(Map<String, Object> params){
        return selectList("userManage.getTeamListByCount", params);
    }

    /** 직급 현황 팝업 **/
    public List<Map<String, Object>> getPositionListByCount(Map<String, Object> params){
        return selectList("userManage.getPositionListByCount", params);
    }

    /** 성별/연령별 현황 팝업 **/
    public List<Map<String, Object>> getGenderListByCount(Map<String, Object> params){
        return selectList("userManage.getGenderListByCount", params);
    }
    public List<Map<String, Object>> getAgeListByCount(Map<String, Object> params){
        return selectList("userManage.getAgeListByCount", params);
    }

    /** 학위별 팝업 **/
    public List<Map<String, Object>> getDegreeListByCount(Map<String, Object> params){
        return selectList("userManage.getDegreeListByCount", params);
    }

    public Map<String,Object> getTotalEmployeeCount(Map<String,Object> params){
        return (Map<String,Object>)selectOne("userManage.getTotalEmployeeCount",params);
    }

    public Map<String,Object> getCurrentPositionByYear(Map<String,Object> params){
        return (Map<String,Object>)selectOne("userManage.getCurrentPositionByYear",params);
    }

    public void setEduReqDetailInsert (Map<String,Object> map) {insert("userManage.setEduReqDetailInsert", map);}

    public void setCareerReqDetailInsert(Map<String,Object> map) {insert("userManage.setCareerReqDetailInsert", map);}

    public void setCertReqDetailInsert(Map<String,Object> map) {insert("userManage.setCertReqDetailInsert", map);}

    public void setTmpDuty(Map<String,Object> map) {
        insert("userManage.setTmpDuty", map);
    }

    public void setTmpDutyDel(Map<String,Object> map) {
        insert("userManage.setTmpDutyDel", map);
    }
    public List<Map<String, Object>> getTmpDutyList(Map<String, Object> params){
        return selectList("userManage.getTmpDutyList", params);
    }
    public List<Map<String, Object>> getAllDutyList(Map<String, Object> params){
        return selectList("userManage.getAllDutyList", params);
    }

    public Map<String, Object> getMonthJoinNum(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("userManage.getMonthJoinNum", params);
    }
}
