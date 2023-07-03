package egovframework.com.devjitsu.doc.approval.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class ApprovalUserRepository extends AbstractDAO {

    /** 상신/보관함 */
    public List<Map<String, Object>> getDraftFormList() { return selectList("approvalUser.getDraftFormList");}
    public List<Map<String, Object>> getUserDocStorageBoxList(Map<String, Object> params) { return selectList("approvalUser.getUserDocStorageBoxList", params);}
    public List<Map<String, Object>> getUserReadDocStorageBoxList(Map<String, Object> params) { return selectList("approvalUser.getUserReadDocStorageBoxList", params);}

    public void setCheckedDocDel(List<Map<String, Object>> params) { update("approvalUser.setCheckedDocDel", params);}

    /** 결재함 */
    public List<Map<String, Object>> getEmpDeptList(Map<String, Object> params) { return selectList("approvalUser.getEmpDeptList", params);}
    public List<Map<String, Object>> getAbsentUserList(Map<String, Object> params) { return selectList("approvalUser.getAbsentUserList", params);}
    public List<Map<String, Object>> getDeptPathList(Map<String, Object> params) { return selectList("approvalUser.getDeptPathList", params);}
    public List<Map<String, Object>> getApproveDocBoxList(Map<String, Object> params) { return selectList("approvalUser.getApproveDocBoxList", params);}

    /** 결재설정 - 결재선 설정 */
    public void setUserFavApproveRoute(Map<String, Object> params){ insert("approvalUser.setUserFavApproveRoute", params);}
    public void setUserFavApproveRouteUpdate(Map<String, Object> params){ update("approvalUser.setUserFavApproveRouteUpdate", params);}
    public void setUserFavApproveRouteActiveN(Map<String, Object> params) { update("approvalUser.setUserFavApproveRouteActiveN", params);}
    public void setUserFavApproveRouteDetail(Map<String, Object> params){ insert("approvalUser.setUserFavApproveRouteDetail", params);}
    public void setUserFavApproveRouteDetailDel(Map<String, Object> params){ delete("approvalUser.setUserFavApproveRouteDetailDel", params);}
    public void setUserFavApproveRouteDetailActiveN(Map<String, Object> params) { update("approvalUser.setUserFavApproveRouteDetailActiveN", params);}
    public List<Map<String, Object>> getUserFavApproveRouteList(Map<String, Object> params){ return selectList("approvalUser.getUserFavApproveRouteList", params);}
    public List<Map<String, Object>> getUserFavApproveRouteDetail(Map<String, Object> params){ return selectList("approvalUser.getUserFavApproveRouteDetail", params);}

    /** 결재설정 - 부재설정 */
    public List<Map<String, Object>> getAbsentSetList(Map<String, Object> params){ return selectList("approvalUser.getAbsentSetList", params);} /** 완료 */
    public List<Map<String, Object>> getComp(Map<String, Object> params) { return  selectList("approvalUser.getComp", params);} /** 완료 */
    public String getMaxAiSeqNum(Map<String, Object> params) { return (String) selectOne("approvalUser.getMaxAiSeqNum", params);} /** 완료 */
    public Map<String, Object> getAbsentSet(Map<String, Object> params) { return (Map<String, Object>) selectOne("approvalUser.getAbsentSet", params); } /** 수정중 */
    public String getOrgPullPath(Map<String, Object> params) { return (String) selectOne("approvalUser.getOrgPullPath", params); }/** 완료 */
    public List<Map<String, Object>> getAbsentDuplicate(Map<String, Object> params) { return selectList("approvalUser.getAbsentDuplicate", params); }/** 완료 */
    public void setAbsentInfo(Map<String, Object> params) { insert("approvalUser.setAbsentInfo", params);}/** 완료 */
    public void setVicariousInfo(Map<String, Object> params) { insert("approvalUser.setVicariousInfo", params);}/** 완료 */
    public void setAbsentInfoUpd(Map<String, Object> params) { update("approvalUser.setAbsentInfoUpd", params);}/** 완료 */
    public void setVicariousInfoUpd(Map<String, Object> params) { update("approvalUser.setVicariousInfoUpd", params); }

}
