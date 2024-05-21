package egovframework.com.cms.bannerpopup.service.impl;

import dev_jitsu.MainLib;
import egovframework.com.cms.bannerpopup.repository.BannerPopupMngrRepository;
import egovframework.com.cms.bannerpopup.service.BannerPopupMngrService;
import egovframework.com.devjitsu.common.repository.CommonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@Service
public class BannerPopupMngrServiceImpl implements BannerPopupMngrService {

    @Autowired
    private BannerPopupMngrRepository bannerPopupMngrRepository;

    @Autowired
    private CommonRepository commonRepository;


    @Override
    public List<Map<String, Object>> getPopupList(Map<String, Object> params) {
        return bannerPopupMngrRepository.getPopupList(params);
    }

    @Override
    public List<Map<String, Object>> getMainPopupList (){
        return bannerPopupMngrRepository.getMainPopupList();
    }
    @Override
    public Map<String, Object> getBannerPopupOpenOne(Map<String, Object> param) {
        return bannerPopupMngrRepository.getBannerPopupOpenOne(param);
    }

    @Override
    public Map<String, Object> getBannerPopupOne(Map<String, Object> params) {
        return bannerPopupMngrRepository.getBannerPopupOne(params);
    }

    @Override
    public Map<String, Object> getBannerPopupFile(Map<String, Object> params) {
        return bannerPopupMngrRepository.getBannerPopupFile(params);
    }

    @Override
    public void setBannerPopupInsert(Map<String, Object> params, MultipartFile[] file, String server_dir, String base_dir) {

        if(params.get("gubun").equals("update")){
            bannerPopupMngrRepository.setBannerPopupUpdate(params);
            if (file.length > 0) {
                MainLib mainLib = new MainLib();
                List<Map<String, Object>> list = mainLib.multiFileUpload(file, listFilePath(params, server_dir));
                for (int i = 0; i < list.size(); i++) {
                    list.get(i).put("frKey", params.get("uuid"));
                    list.get(i).put("registId", params.get("id"));
                    list.get(i).put("filePath", listFilePath(params, base_dir));
                    list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().split("[.]")[0]);
                    list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().split("[.]")[1]);
                }
                bannerPopupMngrRepository.setBannerPopupInsertFile(list);
            }
        }else {
            bannerPopupMngrRepository.setBannerPopupInsert(params);
            if (file.length > 0) {
                MainLib mainLib = new MainLib();
                List<Map<String, Object>> list = mainLib.multiFileUpload(file, listFilePath(params, server_dir));
                for (int i = 0; i < list.size(); i++) {
                    list.get(i).put("frKey", params.get("bannerPopupUuid"));
                    list.get(i).put("registId", params.get("id"));
                    list.get(i).put("filePath", listFilePath(params, base_dir));
                    list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().split("[.]")[0]);
                    list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().split("[.]")[1]);
                }
                bannerPopupMngrRepository.setBannerPopupInsertFile(list);
            }
        }

    }

    private String listFilePath (Map<String, Object> params, String base_dir){
        String path = base_dir + params.get("menuCd").toString()+"File/";

        return path;
    }

    @Override
    public void setBannerPopupDelete(Map<String, Object> param){
        bannerPopupMngrRepository.setBannerPopupDelete(param);
    }
    @Override
    public List<Map<String, Object>> getPopupCancleList (){
        return bannerPopupMngrRepository.getPopupCancleList();
    }
    @Override
    public List<Map<String, Object>> getPopupAgreeList (){
        return bannerPopupMngrRepository.getPopupAgreeList();
    }

    @Override
    public void setPopupCancleUpdate(Map<String, Object> param){
        bannerPopupMngrRepository.setPopupCancleUpdate(param);
    }
    @Override
    public void setPopupAgreeUpdate(Map<String, Object> param){
        bannerPopupMngrRepository.setPopupAgreeUpdate(param);
    }

}
