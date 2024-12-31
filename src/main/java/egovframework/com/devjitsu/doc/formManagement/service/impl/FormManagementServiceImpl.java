package egovframework.com.devjitsu.doc.formManagement.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import dev_jitsu.MainLib;
import egovframework.com.devjitsu.doc.formManagement.repository.FormManagementRepository;
import egovframework.com.devjitsu.doc.formManagement.service.FormManagementService;
import egovframework.devjitsu.common.utiles.CommFileUtil;
import egovframework.devjitsu.common.utiles.CommonUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class FormManagementServiceImpl implements FormManagementService {

    private static final Logger logger = LoggerFactory.getLogger(FormManagementServiceImpl.class);

    @Autowired
    private FormManagementRepository formManagementRepository;

    @Override
    public List<Map<String, Object>> getTemplateFormFile(Map<String, Object> params) {
        return formManagementRepository.getTemplateFormFile(params);
    }

    @Override
    public Map<String, Object> getDocFormInfoReqOpt(Map<String, Object> params) {
        String readerNameStr = "";
        String receiverNameStr = "";
        Map<String, Object> returnMap = new HashMap<>();

        List<Map<String, Object>> readerList = formManagementRepository.getFormReaderList(params);
        List<Map<String, Object>> receiverList = formManagementRepository.getFormReceiverList(params);


        for(Map<String, Object> map : readerList){
            if(map.get("SEQ_TYPE").equals("u")){
                readerNameStr += ", " + map.get("READER_EMP_NAME");

                if(!StringUtils.isEmpty(map.get("READER_DUTY_NAME"))){
                    readerNameStr += "(" + map.get("READER_DUTY_NAME") + ")";
                }else{
                    readerNameStr += "(" + map.get("READER_POSITION_NAME") + ")";
                }
            }else{
                readerNameStr += "," + map.get("READER_DEPT_NAME");
            }
        }

        for(Map<String, Object> map : receiverList){
            if(map.get("SEQ_TYPE").equals("u")){
                receiverNameStr += "," + map.get("RECEIVER_EMP_NAME") + "(" + map.get("RECEIVER_DUTY_NAME") + ")";
            }else{
                receiverNameStr += "," + map.get("RECEIVER_DEPT_NAME");
            }
        }

        returnMap.put("readerName", readerNameStr == "" ? "" : readerNameStr.substring(1));
        returnMap.put("receiverName", receiverNameStr == "" ? "" : receiverNameStr.substring(1));
        returnMap.put("readerList", readerList);
        returnMap.put("receiverList", receiverList);
        returnMap.put("formInfoReqOpt", formManagementRepository.getDocFormInfoReqOpt(params));
        returnMap.put("formCustomFieldList", formManagementRepository.getFormCustomFieldList(params));

        return returnMap;
    }

    @Override
    public Map<String, Object> getFormRdCfList(Map<String, Object> params) {
        String readerNameStr = "";
        Map<String, Object> returnMap = new HashMap<>();

        List<Map<String, Object>> readerList = formManagementRepository.getFormReaderList(params);

        for(Map<String, Object> map : readerList){
            if(map.get("SEQ_TYPE").equals("u")){
                readerNameStr += ", " + map.get("READER_EMP_NAME");

                if(!StringUtils.isEmpty(map.get("READER_DUTY_NAME"))){
                    readerNameStr += "(" + map.get("READER_DUTY_NAME") + ")";
                }else{
                    readerNameStr += "(" + map.get("READER_POSITION_NAME") + ")";
                }
            }else{
                readerNameStr += "," + map.get("READER_DEPT_NAME");
            }
        }

        returnMap.put("readerName", readerNameStr == "" ? "" : readerNameStr.substring(1));
        returnMap.put("readerList", readerList);
        returnMap.put("formCustomFieldList", formManagementRepository.getFormCustomFieldList(params));

        return returnMap;
    }

    @Override
    public Map<String, Object> getDocFormLinkagePopUrl(Map<String, Object> params) {
        return formManagementRepository.getDocFormLinkagePopUrl(params);
    }

    @Override
    public List<Map<String, Object>> getFormFolderList(Map<String, Object> params) {
        return formManagementRepository.getFormFolderList(params);
    }
    @Override
    @Transactional
    public void setFormFolder(Map<String, Object> params) {
        if(StringUtils.isEmpty(params.get("formFolderId"))){
            formManagementRepository.setFormFolder(params);
        }else{
            formManagementRepository.setFormFolderUpd(params);
        }
    }

    @Override
    public void setFormFolderDel(Map<String, Object> params) {
        formManagementRepository.setFormFolderDel(params);
    }

    @Override
    public List<Map<String, Object>> getFormList(Map<String, Object> params) {
        return formManagementRepository.getFormList(params);
    }

    @Override
    @Transactional
    public void setForm(Map<String, Object> params, MultipartFile form, MultipartFile logo, MultipartFile symbol, String server_path, String server_dir, String base_dir) throws Exception {
        Gson gson = new Gson();

        if(StringUtils.isEmpty(params.get("formId"))){
            formManagementRepository.setForm(params);
            if(StringUtils.isEmpty(params.get("formReqOptId"))){
                formManagementRepository.setFormReqOpt(params);
            }else{
                formManagementRepository.setFormReqOptUpd(params);
            }
        }else{
            formManagementRepository.setFormUpd(params);
            if(StringUtils.isEmpty(params.get("formReqOptId"))){
                formManagementRepository.setFormReqOpt(params);
            }else{
                formManagementRepository.setFormReqOptUpd(params);
            }
        }
        setTemplateFormFile(params, form, logo, symbol, server_path, server_dir, base_dir);

        formManagementRepository.setFormReaderReceiverDel(params);
        List<Map<String, Object>> readerList = gson.fromJson((String) params.get("readerArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());
        if(readerList.size() > 0){
            if(StringUtils.isEmpty(readerList.get(0).get("formId"))){
                for(Map<String, Object> map : readerList){
                    map.put("formId", params.get("formId"));
                }
            }

            formManagementRepository.setFormReader(readerList);
        }

        formManagementRepository.setFormCustomFieldDel(params);
        if(!StringUtils.isEmpty(params.get("customFieldArr"))){
            List<Map<String, Object>> customFieldArr = gson.fromJson((String) params.get("customFieldArr"), new TypeToken<List<Map<String, Object>>>() {}.getType());
            if(customFieldArr.size() > 0){
                if(StringUtils.isEmpty(customFieldArr.get(0).get("formId"))){
                    for(Map<String, Object> map : customFieldArr){
                        map.put("formId", params.get("formId"));
                    }
                }

                formManagementRepository.setFormCustomField(customFieldArr);
            }
        }

        /** 위임전결사항 저장 */
        if(!params.containsKey("approvalMngSn")){
            formManagementRepository.setApprovalMng(params);
        }else{
            formManagementRepository.setApprovalMngUpd(params);
        }

        if(params.containsKey("approvalDtArr")){
            formManagementRepository.setApprovalMngDtDel(params);
            List<Map<String, Object>> approvalDtArr = gson.fromJson((String) params.get("approvalDtArr"), new TypeToken<List<Map<String, Object>>>() {}.getType());
            if(approvalDtArr.size() > 0){
                for(Map<String, Object> data : approvalDtArr){
                    data.put("formId", params.get("formId"));
                    data.put("approvalType", params.get("approvalType"));
                    formManagementRepository.setApprovalMngDt(data);
                }
            }
        }
    }

    @Override
    public void setFormDel(Map<String, Object> params, String SERVER_PATH, String base_dir) throws Exception {
        HttpServletRequest servletRequest = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        Map<String, Object> formFileMap = new HashMap<>();
        formFileMap.put("filePath", filePath(servletRequest, params, base_dir));

        String[] formId = params.get("formId").toString().split(",");

        for(String id : formId){
            formFileMap.put("formId", id);
            if(servletRequest.getServerName().contains("localhost") || servletRequest.getServerName().contains("127.0.0.1"))formFileMap.put("fileHostAddress", "localhost");
            else formFileMap.put("fileHostAddress", "server");

            if(servletRequest.getServerName().contains("localhost") || servletRequest.getServerName().contains("127.0.0.1")) {
                CommFileUtil CommFileUtil = new CommFileUtil();
                formFileMap.put("formFileType", "form");
                formFileExistsDel(CommFileUtil, formFileMap, null);

                formFileMap.put("formFileType", "logo");
                formFileExistsDel(CommFileUtil, formFileMap, null);

                formFileMap.put("formFileType", "symbol");
                formFileExistsDel(CommFileUtil, formFileMap, null);
            }else{
                formFileMap.put("formFileType", "form");
                formFileExistsDel(null, formFileMap, SERVER_PATH);

                formFileMap.put("formFileType", "logo");
                formFileExistsDel(null, formFileMap, SERVER_PATH);

                formFileMap.put("formFileType", "symbol");
                formFileExistsDel(null, formFileMap, SERVER_PATH);
            }

            formManagementRepository.setFormCustomFieldDel(formFileMap);
            formManagementRepository.setFormReaderReceiverDel(formFileMap);
            formManagementRepository.setFormReqOptDel(formFileMap);
            formManagementRepository.setFormDel(formFileMap);
        }
    }

    @Override
    public List<Map<String, Object>> getLinkageProcessList(Map<String, Object> params) {
        return formManagementRepository.getLinkageProcessList(params);
    }

    @Override
    public int setProcessValidationChk(Map<String, Object> params) {
        return formManagementRepository.setProcessValidationChk(params);
    }

    @Override
    public void setLinkageProcess(Map<String, Object> params) {
        if(StringUtils.isEmpty(params.get("linkageProcessId"))){
            formManagementRepository.setLinkageProcess(params);
        }else{
            formManagementRepository.setLinkageProcessUpd(params);
        }
    }

    @Override
    public void setLinkageProcessDel(Map<String, Object> params) {
        formManagementRepository.setFormLinkageProcessUpd(params);
        formManagementRepository.setLinkageProcessDel(params);
    }

    public void setTemplateFormFile(Map<String, Object> params, MultipartFile form, MultipartFile logo, MultipartFile symbol, String server_path, String server_dir, String base_dir) throws Exception {
        HttpServletRequest servletRequest = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        //양식 관련 파일 저장
        MainLib mainLib = new MainLib();
        Map<String, Object> formFileMap = new HashMap<>();
        formFileMap.put("formId", params.get("formId"));
        formFileMap.put("empSeq", params.get("empSeq"));
        formFileMap.put("filePath", filePath(servletRequest, params, base_dir));

        if(servletRequest.getServerName().contains("localhost") || servletRequest.getServerName().contains("127.0.0.1"))formFileMap.put("fileHostAddress", "localhost");
        else formFileMap.put("fileHostAddress", "server");

        if(form != null){
            formFileMap.put("formFileType", "form");

            if(servletRequest.getServerName().contains("localhost") || servletRequest.getServerName().contains("127.0.0.1")) {
                CommFileUtil CommFileUtil = new CommFileUtil();
                formFileExistsDel(CommFileUtil, formFileMap, null);
                formFileMap.putAll(CommFileUtil.setServerMFSave(form, filePath(servletRequest, params, server_dir)));
                formFileMap.put("filePath", formFileMap.get("filePath").toString().replace("\\\\", "//").replace("\\", "/"));
            }else{
                formFileExistsDel(null, formFileMap, server_path);
                formFileMap.putAll(mainLib.fileUpload(form, filePath(servletRequest, params, server_dir)));
                formFileMap.put("filePath", dbFilePath(servletRequest, params, base_dir));

                formFileMap.put("fileOrgName", formFileMap.get("orgFilename").toString().substring(0, formFileMap.get("orgFilename").toString().lastIndexOf(".")));
                formFileMap.put("fileExt", formFileMap.get("orgFilename").toString().substring(formFileMap.get("orgFilename").toString().lastIndexOf(".") + 1));

            }
            formManagementRepository.setTemplateFormFile(formFileMap);
        }

        if(logo != null){
            formFileMap.put("formFileType", "logo");

            if(servletRequest.getServerName().contains("localhost") || servletRequest.getServerName().contains("127.0.0.1")) {
                CommFileUtil CommFileUtil = new CommFileUtil();
                formFileExistsDel(CommFileUtil, formFileMap, null);
                formFileMap.putAll(CommFileUtil.setServerMFSave(logo, filePath(servletRequest, params, server_dir)));
                formFileMap.put("filePath", formFileMap.get("filePath").toString().replace("\\\\", "//").replace("\\", "/"));
            }else{
                formFileExistsDel(null, formFileMap, server_path);
                formFileMap.putAll(mainLib.fileUpload(logo, filePath(servletRequest, params, server_dir)));
                formFileMap.put("filePath", dbFilePath(servletRequest, params, base_dir));
                formFileMap.put("fileOrgName",formFileMap.get("orgFilename").toString().substring(0, formFileMap.get("orgFilename").toString().lastIndexOf(".")));
                formFileMap.put("fileExt", formFileMap.get("orgFilename").toString().substring(formFileMap.get("orgFilename").toString().lastIndexOf(".") + 1));
                formFileMap.put("fileHostAddress", "server");
            }
            formManagementRepository.setTemplateFormFile(formFileMap);
        }

        if(symbol != null){
            formFileMap.put("formFileType", "symbol");

            if(servletRequest.getServerName().contains("localhost") || servletRequest.getServerName().contains("127.0.0.1")) {
                CommFileUtil CommFileUtil = new CommFileUtil();
                formFileExistsDel(CommFileUtil, formFileMap, null);
                formFileMap.putAll(CommFileUtil.setServerMFSave(symbol, filePath(servletRequest, params, server_dir)));
                formFileMap.put("filePath", formFileMap.get("filePath").toString().replace("\\\\", "//").replace("\\", "/"));
            }else{
                formFileExistsDel(null, formFileMap, server_path);
                formFileMap.putAll(mainLib.fileUpload(symbol, filePath(servletRequest, params, server_dir)));
                formFileMap.put("filePath", dbFilePath(servletRequest, params, base_dir));
                formFileMap.put("fileOrgName",formFileMap.get("orgFilename").toString().substring(0, formFileMap.get("orgFilename").toString().lastIndexOf(".")));
                formFileMap.put("fileExt", formFileMap.get("orgFilename").toString().substring(formFileMap.get("orgFilename").toString().lastIndexOf(".") + 1));

                formFileMap.put("fileHostAddress", "server");
            }
            formManagementRepository.setTemplateFormFile(formFileMap);
        }
    }

    private Map<String, Object> formFileExistsDel(CommFileUtil CommFileUtil, Map<String, Object> params, String server_path){
        Map<String, Object> result = new HashMap<>();

        Map<String, Object> formFile = new HashMap<>();
        formFile = formManagementRepository.getTemplateFormFileExists(params);
        try {
            if(params.get("fileHostAddress") == "localhost"){
                CommFileUtil.setServerFileDel((String)params.get("filePath"), (String)formFile.get("file_uuid"));

                formManagementRepository.setTemplateFormFileDelOne(params);
            }else{
                CommonUtil commonUtil = new CommonUtil();
                boolean isDelete = commonUtil.deleteFile(new String[]{formFile.get("file_uuid").toString()}, server_path + params.get("filePath").toString());

                if(isDelete){
                    formManagementRepository.setTemplateFormFileDelOne(params);
                }else{
                    throw new Exception();
                }
                result.put("code", "200");
            }
        }catch (Exception e){
            result.put("code", "500");
        }

        return result;
    }

    @Override
    public Map<String, Object> getApprovalMngData(Map<String, Object> params) {
        return formManagementRepository.getApprovalMngData(params);
    }

    @Override
    public List<Map<String, Object>> getApprovalMngDtList(Map<String, Object> params) {
        return formManagementRepository.getApprovalMngDtList(params);
    }

    private String filePath (HttpServletRequest servletRequest, Map<String, Object> params, String base_dir){
        String path = "templateForm/" + params.get("formId");
        if(servletRequest.getServerName().contains("localhost") || servletRequest.getServerName().contains("127.0.0.1")){
        }else{
//            path = "/home" + base_dir + path + "/";
            path = base_dir + path + "/";

        }

        return path;
    }

    private String dbFilePath(HttpServletRequest servletRequest, Map<String, Object> params, String base_dir){
        String path = "";

        if(servletRequest.getServerName().contains("localhost") || servletRequest.getServerName().contains("127.0.0.1") || servletRequest.getServerName().contains("121.186.165.80") || servletRequest.getServerName().contains("218.158.231.186")){
            path = "http:\\\\218.158.231.186" + base_dir + "templateForm/" + params.get("formId") + "/";
        }else{
            path = "http:\\\\218.158.231.184" + base_dir + "templateForm/" + params.get("formId") + "/";
        }

        return path.replace("\\\\", "//");
    }
}
