package egovframework.com.devjitsu.doc.formManagement.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class FormManagementRepository extends AbstractDAO {

    public List<Map<String, Object>> getFormFolderList(Map<String, Object> params) { return selectList("formManage.getFormFolderList", params);}
    public void setFormFolder(Map<String, Object> params){ insert("formManage.setFormFolder", params);}
    public void setFormFolderUpd(Map<String, Object> params){ update("formManage.setFormFolderUpd", params);}
    public void setFormFolderDel(Map<String, Object> params){ delete("formManage.setFormFolderDel", params);}
    public List<Map<String, Object>> getFormList(Map<String, Object> params){return selectList("formManage.getFormList", params);}
    public Map<String, Object> getDocFormInfoReqOpt(Map<String, Object> params) { return (Map<String, Object>) selectOne("formManage.getDocFormInfoReqOpt", params);}
    public List<Map<String, Object>> getFormReaderList(Map<String, Object> params){return selectList("formManage.getFormReaderList", params);}
    public List<Map<String, Object>> getFormReceiverList(Map<String, Object> params){return selectList("formManage.getFormReceiverList", params);}
    public List<Map<String, Object>> getFormCustomFieldList(Map<String, Object> params){return selectList("formManage.getFormCustomFieldList", params);}
    public List<Map<String, Object>> getTemplateFormFile(Map<String, Object> params){ return selectList("formManage.getTemplateFormFile", params);}
    public void setForm(Map<String, Object> params){ insert("formManage.setForm", params);}
    public void setFormUpd(Map<String, Object> params){ update("formManage.setFormUpd", params);}
    public void setFormLinkageProcessUpd(Map<String, Object> params){ update("formManage.setFormLinkageProcessUpd", params);}
    public void setFormDel(Map<String, Object> params){ delete("formManage.setFormDel", params);}
    public Map<String, Object> getTemplateFormFileExists(Map<String, Object> params){ return (Map<String, Object>) selectOne("formManage.getTemplateFormFileExists", params);}
    public void setTemplateFormFileDelOne(Map<String, Object> params){ delete("formManage.setTemplateFormFileDelOne", params);}
    public void setTemplateFormFile(Map<String, Object> params){ insert("formManage.setTemplateFormFile", params);}
    public void setFormReqOpt(Map<String, Object> params) { insert("formManage.setFormReqOpt", params);}
    public void setFormReqOptUpd(Map<String, Object> params) { update("formManage.setFormReqOptUpd", params);}
    public void setFormReqOptDel(Map<String, Object> params){ delete("formManage.setFormReqOptDel", params);}
    public void setFormReader(List<Map<String, Object>> params) { insert("formManage.setFormReader", params);}
    public void setFormCustomField(List<Map<String, Object>> params) { insert("formManage.setFormCustomField", params);}
    public void setFormReaderReceiverDel(Map<String, Object> params) {
        delete("formManage.setFormReaderDel", params);
        delete("formManage.setFormReceiverDel", params);
    }
    public void setFormCustomFieldDel(Map<String, Object> params) { delete("formManage.setFormCustomFieldDel", params);}
    public Map<String, Object> getDocFormLinkagePopUrl(Map<String, Object> params) { return (Map<String, Object>) selectOne("formManage.getDocFormLinkagePopUrl", params);}
    public List<Map<String, Object>> getLinkageProcessList(Map<String, Object> params) { return selectList("formManage.getLinkageProcessList", params);}
    public int setProcessValidationChk(Map<String, Object> params) { return (int) selectOne("formManage.setProcessValidationChk", params); }
    public void setLinkageProcess(Map<String, Object> params) { insert("formManage.setLinkageProcess", params);}
    public String getLinkageProcess(Map<String, Object> params) { return (String) selectOne("formManage.getLinkageProcess", params);}
    public void setLinkageProcessUpd(Map<String, Object> params) { update("formManage.setLinkageProcessUpd", params);}
    public void setLinkageProcessDel(Map<String, Object> params) { delete("formManage.setLinkageProcessDel", params);}
    public void setApprovalMng(Map<String, Object> params){ insert("formManage.setApprovalMng", params);}
    public void setApprovalMngUpd(Map<String, Object> params){ insert("formManage.setApprovalMngUpd", params);}
    public void setApprovalMngDt(Map<String, Object> params){ insert("formManage.setApprovalMngDt", params);}
    public void setApprovalMngDtDel(Map<String, Object> params){ insert("formManage.setApprovalMngDtDel", params);}
    public Map<String, Object> getApprovalMngData(Map<String, Object> params) { return (Map<String, Object>) selectOne("formManage.getApprovalMngData", params);}
    public List<Map<String, Object>> getApprovalMngDtList(Map<String, Object> params) { return selectList("formManage.getApprovalMngDtList", params);}
}
