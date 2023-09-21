package egovframework.com.devjitsu.cam_crm.service.impl;

import dev_jitsu.MainLib;
import egovframework.com.devjitsu.cam_crm.repository.CrmRepository;
import egovframework.com.devjitsu.cam_crm.service.CrmService;
import egovframework.com.devjitsu.common.repository.CommonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CrmServiceImpl implements CrmService {

    @Autowired
    private CrmRepository crmRepository;

    @Autowired
    private CommonRepository commonRepository;

    @Override
    public List<Map<String, Object>> getPopCrmList(Map<String, Object> params) {
        return crmRepository.getPopCrmList(params);
    }

    @Override
    public Map<String, Object> getCrmData(Map<String, Object> params) {
        return crmRepository.getCrmData(params);
    }


    @Override
    public Map<String, Object> getCrmInfo(Map<String, Object> params) {
        return crmRepository.getCrmInfo(params);
    }

    @Override
    public List<Map<String, Object>> getCrmList(Map<String, Object> params) {
        return crmRepository.getCrmList(params);
    }

    @Override
    public void setCrmDel(Map<String, Object> params) {
        crmRepository.setCrmDel(params);
        crmRepository.setCrmHistDel(params);
    }

    @Override
    public void setCrmInfo(Map<String, Object> params, MultipartHttpServletRequest request, String serverDir, String baseDir) {

        try{

            if(params.containsKey("crmSn")){

                if(params.containsKey("data")){
                    crmRepository.updCrmMainData(params);
                } else {
                    crmRepository.updCrmInfo(params);
                }

                MainLib mainLib = new MainLib();
                Map<String, Object> fileInsMap = new HashMap<>();

                MultipartFile crmFile = request.getFile("crmFile");
                MultipartFile crmLics = request.getFile("crmLics");
                MultipartFile bnCp = request.getFile("bnCp");

                if(crmFile != null){
                    if(!crmFile.isEmpty()){
                        fileInsMap = mainLib.fileUpload(crmFile, filePath(params, serverDir));
                        fileInsMap.put("contentId", "crmInfo_" + params.get("crmSn"));
                        fileInsMap.put("crmSn", params.get("crmSn"));
                        fileInsMap.put("fileCd", params.get("menuCd"));
                        fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                        fileInsMap.put("filePath", filePath(params, baseDir));
                        fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                        fileInsMap.put("empSeq", params.get("regEmpSeq"));
                        commonRepository.insOneFileInfo(fileInsMap);

                        fileInsMap.put("crmFile", fileInsMap.get("file_no"));
                        crmRepository.updCrmFile(fileInsMap);
                    }
                }

                if(crmLics != null){
                    if(!crmLics.isEmpty()){
                        fileInsMap = mainLib.fileUpload(crmLics, filePath(params, serverDir));
                        fileInsMap.put("contentId", "crmInfo_" + params.get("crmSn"));
                        fileInsMap.put("crmSn", params.get("crmSn"));
                        fileInsMap.put("fileCd", params.get("menuCd"));
                        fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                        fileInsMap.put("filePath", filePath(params, baseDir));
                        fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                        fileInsMap.put("empSeq", params.get("regEmpSeq"));
                        commonRepository.insOneFileInfo(fileInsMap);

                        fileInsMap.put("crmLics", fileInsMap.get("file_no"));
                        crmRepository.updCrmLics(fileInsMap);
                    }
                }

                if(bnCp != null){
                    if(!bnCp.isEmpty()){
                        fileInsMap = mainLib.fileUpload(bnCp, filePath(params, serverDir));
                        fileInsMap.put("contentId", "crmInfo_" + params.get("crmSn"));
                        fileInsMap.put("crmSn", params.get("crmSn"));
                        fileInsMap.put("fileCd", params.get("menuCd"));
                        fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                        fileInsMap.put("filePath", filePath(params, baseDir));
                        fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                        fileInsMap.put("empSeq", params.get("regEmpSeq"));
                        commonRepository.insOneFileInfo(fileInsMap);

                        fileInsMap.put("bnCp", fileInsMap.get("file_no"));
                        crmRepository.updBnCp(fileInsMap);
                    }
                }
            } else {
                crmRepository.insCrmInfo(params);
            }


        } catch (Exception e){
            e.printStackTrace();
        }
    }

    private String filePath (Map<String, Object> params, String base_dir){
        LocalDate now = LocalDate.now();
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        String fmtNow = now.format(fmt);

        String path = base_dir + params.get("menuCd").toString()+"/" + fmtNow + "/";

        return path;
    }

    @Override
    public Map<String, Object> getCrmFileInfo(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();

        result.put("crmFile", crmRepository.getCrmFileInfo(params));
        result.put("crmLics", crmRepository.getCrmLicsInfo(params));
        result.put("bnCp", crmRepository.getBnCpInfo(params));
        return result;
    }

    @Override
    public void setCrmMemInfo(Map<String, Object> params) {
        if(!params.containsKey("crmMemSn")){
            crmRepository.insCrmMemInfo(params);
        } else {
            crmRepository.updCrmMemInfo(params);
        }
    }

    @Override
    public List<Map<String, Object>> getCrmMemList(Map<String, Object> params) {
        return crmRepository.getCrmMemList(params);
    }

    @Override
    public void delCrmMemInfo(Map<String, Object> params) {
        crmRepository.delCrmMemInfo(params);
    }

    @Override
    public Map<String, Object> getCrmMemInfo(Map<String, Object> params) {
        return crmRepository.getCrmMemInfo(params);
    }

    @Override
    public Map<String, Object> getCrmIndustry(Map<String, Object> params) {
        return crmRepository.getCrmIndustry(params);
    }

    @Override
    public void setCrmIndustry(Map<String, Object> params) {
        if(StringUtils.isEmpty(params.get("crmIndustrySn"))){
            crmRepository.setCrmIndustry(params);
        }else{
            crmRepository.setCrmIndustryUpd(params);
        }
    }

    @Override
    public Map<String, Object> getCrmCert(Map<String, Object> params) {
        return crmRepository.getCrmCert(params);
    }

    @Override
    public void setCrmCert(Map<String, Object> params) {
        if(StringUtils.isEmpty(params.get("crmCertSn"))){
            crmRepository.setCrmCert(params);
        }else{
            crmRepository.setCrmCertUpd(params);
        }
    }

    @Override
    public Map<String, Object> getCrmAccounting(Map<String, Object> params) {
        return crmRepository.getCrmAccounting(params);
    }

    @Override
    public void setCrmAccounting(Map<String, Object> params, MultipartHttpServletRequest request, String SERVER_DIR, String BASE_DIR) {
        if(StringUtils.isEmpty(params.get("crmAccountingSn"))){
            crmRepository.setCrmAccounting(params);
        }else{
            crmRepository.setCrmAccountingUpd(params);
        }

        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        /** 사업자 등록증 */
        MultipartFile file1 = request.getFile("file1");
        if(file1 != null){
            if(!file1.isEmpty()){
                fileInsMap = mainLib.fileUpload(file1, filePath(params, SERVER_DIR));
                fileInsMap.put("crmAccountingSn", params.get("crmAccountingSn"));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "FILE1");
                fileInsMap.put("crmSn", params.get("crmSn"));
                crmRepository.setCrmAccountingFileUpd(fileInsMap);
            }
        }

        /** 통장사본 */
        MultipartFile file2 = request.getFile("file2");
        if(file2 != null){
            if(!file2.isEmpty()){
                fileInsMap = mainLib.fileUpload(file2, filePath(params, SERVER_DIR));
                fileInsMap.put("crmAccountingSn", params.get("crmAccountingSn"));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("value", fileInsMap.get("file_no"));
                fileInsMap.put("column", "FILE2");
                fileInsMap.put("crmSn", params.get("crmSn"));

                crmRepository.setCrmAccountingFileUpd(fileInsMap);
            }
        }
    }

    @Override
    public Map<String, Object> getCrmMgScale(Map<String, Object> params) {
        return crmRepository.getCrmMgScale(params);
    }

    @Override
    public void setCrmMgScale(Map<String, Object> params) {
        if(StringUtils.isEmpty(params.get("crmMgScaleSn"))){
            crmRepository.setCrmMgScale(params);
        }else{
            crmRepository.setCrmMgScaleUpd(params);
        }
    }

    @Override
    public List<Map<String, Object>> getCrmHistList(Map<String, Object> params) {
        return crmRepository.getCrmHistList(params);
    }

    @Override
    public Map<String, Object> getRegCrmHist(Map<String, Object> params) {
        return crmRepository.getRegCrmHist(params);
    }

    @Override
    public void setCrmHist(Map<String, Object> params) {
        crmRepository.insCrmHist(params);
    }

    @Override
    public List<Map<String, Object>> groupCodeList(Map<String, Object> params) {
        return crmRepository.groupCodeList(params);
    }

    @Override
    public void saveGroupCode(Map<String, Object> params) {
        crmRepository.saveGroupCode(params);
    }

    @Override
    public List<Map<String, Object>> codeList(Map<String, Object> params) {
        return crmRepository.codeList(params);
    }

    @Override
    public void insSetLgCode(Map<String, Object> params) {
        crmRepository.insSetLgCode(params);
    }

    @Override
    public List<Map<String, Object>> smCodeList(Map<String, Object> params) {
        return crmRepository.smCodeList(params);
    }

    @Override
    public void insCrmCode(Map<String, Object> params) {
        crmRepository.insCrmCode(params);
    }

    @Override
    public List<Map<String, Object>> selLgCode(Map<String, Object> params) {
        return crmRepository.selLgCode(params);
    }

    @Override
    public List<Map<String, Object>> selSmCode(Map<String, Object> params) {
        return crmRepository.selSmCode(params);
    }
}
