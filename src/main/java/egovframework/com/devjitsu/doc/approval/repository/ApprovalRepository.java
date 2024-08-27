package egovframework.com.devjitsu.doc.approval.repository;

import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class ApprovalRepository extends AbstractDAO {

    public Map<String, Object> getIntraApproveStatus(LoginVO loginVO) { return (Map<String, Object>) selectOne("approval.getIntraApproveStatus", loginVO);}
    public List<Map<String, Object>> getArchiveTreeList(Map<String, Object> params){return selectList("approval.getArchiveTreeList", params);}
    public List<Map<String, Object>> getFinalApprovalDocList(Map<String, Object> params) { return selectList("approval.getFinalApprovalDocList", params);}
    public Map<String, Object> getApproveUserInfo(String approveEmpSeq){ return (Map<String, Object>) selectOne("approval.getApproveUserInfo", approveEmpSeq);}
    public void setLinkageProcessDocInterlock(Map<String, Object> params) {insert("approval.setLinkageProcessDocInterlock", params);}
    public void setLinkageProcessDocInterlockUpd(Map<String, Object> params) {insert("approval.setLinkageProcessDocInterlockUpd", params);}
    public Map<String, Object> getLinkageProcessDocInterlock(Map<String, Object> params) { return (Map<String, Object>) selectOne("approval.getLinkageProcessDocInterlock", params);}
    public Map<String, Object> getDeptDocNum(Map<String, Object> params){ return (Map<String, Object>) selectOne("approval.getDeptDocNum", params);}
    public void setDeptDocNumUpd(Map<String, Object> params) { update("approval.setDeptDocNumUpd", params);}
    public void setDocNumUpd(Map<String, Object> params) { update("approval.setDocNumUpd", params);}
    public String getApprovalDocNoChk(Map<String, Object> params) { return (String) selectOne("approval.getApprovalDocNoChk", params);}
    public void setApproveDocInfo(Map<String, Object> params){ insert("approval.setApproveDocInfo", params);}
    public String getApproveDocFileInfo(Map<String, Object> params) { return (String) selectOne("approval.getApproveDocFileInfo", params);}
    public void setApproveDocFileUpD(Map<String, Object> params){ insert("approval.setApproveDocFileUpD", params);}
    public void setApproveFileDocIdUpD(Map<String, Object> params){ insert("approval.setApproveFileDocIdUpD", params);}
    public void setApproveDocOpt(Map<String, Object> params){ insert("approval.setApproveDocOpt", params);}
    public void setApproveDocOptUpd(Map<String, Object> params){ insert("approval.setApproveDocOptUpd", params);}
    public void setDocFileCopy(Map<String, Object> params) {
        insert("approval.setDocFileCopy", params);
    }
    public void setApproveDocOptUpd2(Map<String, Object> params){ insert("approval.setApproveDocOptUpd2", params);}
    public void setDocApproveRoute(Map<String, Object> params){ insert("approval.setDocApproveRoute", params);}
    public void setDocReceiver(List<Map<String, Object>> params){ insert("approval.setDocReceiver", params);}
    public void setDocReferences(Map<String, Object> params){ insert("approval.setDocReferences", params);}
    public void setDocReader(List<Map<String, Object>> params){ insert("approval.setDocReader", params);}
    public Map<String, Object> getDocInfo(Map<String, Object> params){ return (Map<String, Object>) selectOne("approval.getDocInfo", params);}
    public int getApproveRouteId(Map<String, Object> params){ return (int)selectOne("approval.getApproveRouteId", params);}
    public List<Map<String, Object>> getDocAttachmentList(Map<String, Object> params) { return selectList("approval.getDocAttachmentList", params);}
    public List<Map<String, Object>> getOnnaraDocAttachmentList(Map<String, Object> params) { return selectList("approval.getOnnaraDocAttachmentList", params);}
    public List<Map<String, Object>> getDocApproveAllRoute(Map<String, Object> params){ return selectList("approval.getDocApproveAllRoute", params);}
    public List<Map<String, Object>> getDocReceiverAll(Map<String, Object> params){ return selectList("approval.getDocReceiverAll", params);}
    public List<Map<String, Object>> getDocReferencesAll(Map<String, Object> params){ return selectList("approval.getDocReferencesAll", params);}
    public List<Map<String, Object>> getDocReaderAll(Map<String, Object> params){ return selectList("approval.getDocReaderAll", params);}
    public Map<String, Object> getDocApproveNowRoute(Map<String, Object> params) { return (Map<String, Object>) selectOne("approval.getDocApproveNowRoute", params);}
    public Map<String, Object> getDocApprovePrevRoute(Map<String, Object> params) { return (Map<String, Object>) selectOne("approval.getDocApprovePrevRoute", params);}
    public int getIsExistsAbsent(Map<String, Object> params) { return (int) selectOne("approval.getIsExistsAbsent", params);}
    public void setDocApproveRouteReadDt(Map<String, Object> params) { update("approval.setDocApproveRouteReadDt", params);}
    public boolean getDocSecurityApprLineInUserChk(Map<String, Object> params) { return (boolean) selectOne("approval.getDocSecurityApprLineInUserChk", params);}
    public int getUserDocReadUserChk(Map<String, Object> params) { return (int)selectOne("approval.getUserDocReadUserChk", params);}
    public int setDocReaderReadCnt(Map<String, Object> params) { return (int)selectOne("approval.setDocReaderReadCnt", params);}
    public void setDocReaderUser(Map<String, Object> params) { insert("approval.setDocReaderUser", params);}
    public void setDocReaderUserReadDtUpd(Map<String, Object> params) { update("approval.setDocReaderUserReadDtUpd", params);}
    public void setDocInfoStatUp(Map<String, Object> params) { update("approval.setDocInfoStatUp", params);}
    public void setDocApproveRouteUp(Map<String, Object> params) { update("approval.setDocApproveRouteUp", params);}
    public Map<String, Object> getDocApprovePrevRouteData(Map<String, Object> params) { return (Map<String, Object>) selectOne("approval.getDocApprovePrevRouteData", params);}
    public void setDocInfoStatCancelUp(Map<String, Object> params) { update("approval.setDocInfoStatCancelUp", params);}
    public void setDocApproveCancelRouteUp(Map<String, Object> params) { update("approval.setDocApproveCancelRouteUp", params);}
    public List<Map<String, Object>> getDocApproveType2List(Map<String, Object> params) { return selectList("approval.getDocApproveType2List", params);}
    public void setDocApproveRouteNoApproveUp(Map<String, Object> params) { update("approval.setDocApproveRouteNoApproveUp", params);}
    public void setReferDocInfoStatUp(Map<String, Object> params) { update("approval.setReferDocInfoStatUp", params);}
    public List<Map<String, Object>> getDocApproveHistOpinList(Map<String, Object> params) { return selectList("approval.getDocApproveHistOpinList", params);}
    public List<Map<String, Object>> getDocApproveStatusHistList(Map<String, Object> params) { return selectList("approval.getDocApproveStatusHistList", params);}
    public List<Map<String, Object>> getDocReaderHistList(Map<String, Object> params) { return selectList("approval.getDocReaderHistList", params);}
    public void setReferDocApproveRouteUp(Map<String, Object> params){ update("approval.setReferDocApproveRouteUp", params);}
    public void setReferDocApproveRouteDel(Map<String, Object> params){ update("approval.setReferDocApproveRouteDel", params);}
    public void setDocReceiverDel(Map<String, Object> params){ delete("approval.setDocReceiverDel", params);}
    public void setDocReferencesDel(Map<String, Object> params) { delete("approval.setDocReferencesDel", params);}
    public void setDocReaderDel(Map<String, Object> params){ delete("approval.setDocReaderDel", params);}

    /** 시스템 연동 첨부파일 조회(구매계약) */
    public List<Map<String, Object>> getDocAttachmentListForSys(Map<String, Object> params) { return selectList("approval.getDocAttachmentListForSys", params);}

    public void setFormIdUpd(Map<String, Object> params){ delete("approval.setFormIdUpd", params);}

    public Map<String, Object> getDraftEmpSeq(Map<String, Object> params){ return (Map<String, Object>) selectOne("approval.getDraftEmpSeq", params);}

}
