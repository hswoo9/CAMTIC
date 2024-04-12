package egovframework.com.devjitsu.gw.user.service.impl;

import dev_jitsu.MainLib;
import egovframework.com.devjitsu.common.repository.CommonRepository;
import egovframework.com.devjitsu.gw.user.repository.UserRepository;
import egovframework.com.devjitsu.gw.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CommonRepository commonRepository;

    @Override
    public List<Map<String, Object>> getOrgDeptList(Map<String, Object> param) {
        return userRepository.getOrgDeptList(param);
    }

    @Override
    public Map<String, Object> getUserInfo(Map<String, Object> params) {
        return userRepository.getUserInfo(params);
    }

    @Override
    public Map<String, Object> getManagerInfo(Map<String, Object> params) {
        return userRepository.getManagerInfo(params);
    }

    @Override
    public Map<String, Object> getTempMngInfo(Map<String, Object> params) {
        return userRepository.getTempMngInfo(params);
    }

    @Override
    public Map<String, Object> getIdCheck(Map<String, Object> params) {
        return userRepository.getIdCheck(params);
    }

    @Override
    public List<Map<String, Object>> getEmpList(Map<String, Object> params) {
        return userRepository.getEmpList(params);
    }

    @Override
    public List<Map<String, Object>> getEmpSelList(Map<String, Object> params) {
        return userRepository.getEmpSelList(params);
    }

    public void setUserInfoUpdate(Map<String, Object> params) {
        userRepository.setUserInfoUpdate(params);
    }

    @Override
    public Map<String, Object> getUserPersonnelOne(Map<String, Object> params) {
        return userRepository.getUserPersonnelOne(params);
    }

    @Override
    public Map<String, Object> getUserIdPhotoInfo(Map<String, Object> params) {
        Map<String, Object> infoMap = userRepository.getUserImageInfo(params);

        if(infoMap != null){
            params.put("fileNo", infoMap.get("ID_IMAGE_PK"));
        }

        return commonRepository.getContentFileOne(params);
    }

    private String filePath (Map<String, Object> params, String base_dir){
        LocalDate now = LocalDate.now();
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        String fmtNow = now.format(fmt);

        String path = base_dir + params.get("menuCd").toString()+"/" + fmtNow + "/";

        return path;
    }
    @Override
    public void setHistoryAdd(Map<String, Object> params, MultipartFile[] historyFiles, String serverDir, String baseDir) {

        try{
            if (params.containsKey("HISTORY_SN")){
                /*userRepository.updHistoryInfo(params);*/
            } else {
                userRepository.setHistoryInfo(params);
            }

            if(historyFiles.length > 0){
                MainLib mainLib = new MainLib();
                List<Map<String, Object>> list = mainLib.multiFileUpload(historyFiles, filePath(params, serverDir));
                for(int i = 0 ; i < list.size() ; i++){
                    list.get(i).put("frKey", params.get("HISTORY_SN"));
                    list.get(i).put("empSeq", params.get("regEmpSeq"));
                    list.get(i).put("fileCd", params.get("menuCd"));
                    list.get(i).put("filePath", filePath(params, baseDir));
                    list.get(i).put("fileOrgName",list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf(".")));
                    list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf(".") + 1));
                }
                commonRepository.insFileInfo(list);
            }
        } catch (Exception e){
            e.printStackTrace();
        }
    }

    @Override
    public List<Map<String, Object>> getHistoryList(Map<String, Object> params){
        return userRepository.getHistoryList(params);
    }

    @Override
    public Map<String, Object> getHistoryOne(Map<String, Object> params) {return userRepository.getHistoryOne(params);}

    @Override
    public List<Map<String, Object>> getHistoryFileInfo(Map<String, Object> params){
        return userRepository.getHistoryFileInfo(params);
    }

    @Override
    public Map<String, Object> getUserInfoToId(Map<String, Object> params) {return userRepository.getUserInfoToId(params);}


}
