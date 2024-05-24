package egovframework.com.devjitsu.etc.service.impl;

import dev_jitsu.MainLib;
import egovframework.com.devjitsu.common.repository.CommonRepository;
import egovframework.com.devjitsu.etc.repository.EtcRepository;
import egovframework.com.devjitsu.etc.service.EtcService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EtcServiceImpl implements EtcService {

    @Autowired
    private EtcRepository etcRepository;

    @Autowired
    private CommonRepository commonRepository;

    @Override
    public List<Map<String, Object>> getSignInfoList(Map<String, Object> params) {
        return etcRepository.getSignInfoList(params);
    }

    @Override
    public Map<String, Object> getSignInfoOne(Map<String, Object> params) {
        return etcRepository.getSignInfoOne(params);
    }

    @Override
    public void setSignInfo(Map<String, Object> params, MultipartFile[] file, String server_dir, String base_dir) {

        Map<String, Object> result = new HashMap<>();

        if(!params.containsKey("signSeq")){
            etcRepository.setSignInfoIns(params);
        } else {
            etcRepository.setSignInfoUpd(params);
        }

        String signKey = params.get("signSeq").toString();
        String contentId = "sign_" + signKey;

        MainLib mainLib = new MainLib();
        if(file.length > 0){
            List<Map<String, Object>> list = mainLib.multiFileUpload(file, filePath(params, server_dir));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", contentId);
                list.get(i).put("empSeq", params.get("empSeq"));
                list.get(i).put("fileCd", "etc");
                list.get(i).put("filePath", filePath(params, base_dir));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf(".")));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf(".") + 1));
            }
            commonRepository.insFileInfo(list);
        }
    }

    @Override
    public void setSignInfoDel(Map<String, Object> params) {
        etcRepository.setSignInfoDel(params);
    }

    private String filePath (Map<String, Object> params, String base_dir){
        LocalDate now = LocalDate.now();
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        String fmtNow = now.format(fmt);

        String path = base_dir + "etc" + "/" + fmtNow + "/";

        return path;
    }

}
