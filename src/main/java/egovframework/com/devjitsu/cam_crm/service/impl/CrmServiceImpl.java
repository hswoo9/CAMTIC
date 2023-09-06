package egovframework.com.devjitsu.cam_crm.service.impl;

import dev_jitsu.MainLib;
import egovframework.com.devjitsu.cam_crm.repository.CrmRepository;
import egovframework.com.devjitsu.cam_crm.service.CrmService;
import egovframework.com.devjitsu.common.repository.CommonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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
    public void setCrmInfo(Map<String, Object> params, MultipartHttpServletRequest request, String serverDir, String baseDir) {

        try{

            if(params.containsKey("crmSn")){

                crmRepository.updCrmInfo(params);
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
}
