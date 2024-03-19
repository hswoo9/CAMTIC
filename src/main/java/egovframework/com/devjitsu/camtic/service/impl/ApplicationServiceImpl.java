package egovframework.com.devjitsu.camtic.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import dev_jitsu.MainLib;
import egovframework.com.devjitsu.common.repository.CommonRepository;
import egovframework.com.devjitsu.camtic.repository.ApplicationRepository;
import egovframework.com.devjitsu.camtic.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ApplicationServiceImpl implements ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private CommonRepository commonRepository;

    @Override
    public void setJoinAccess(Map<String, Object> params) {
        applicationRepository.setJoinAccess(params);
    }

    @Override
    public Map<String, Object> getApplicationUser(Map<String, Object> params) {
        return applicationRepository.getApplicationUser(params);
    }

    @Override
    public Map<String, Object> userAgreeChk(Map<String, Object> params) {
        Map<String, Object> returnMap = new HashMap<>();
        returnMap.put("chk", applicationRepository.userAgreeChk(params));

        if(applicationRepository.userAgreeChk(params)){
            returnMap.put("applicationId", applicationRepository.getUserApplicationId(params));
        }

        returnMap.put("applicationChk", applicationRepository.getApplicationChk(params));
        returnMap.put("chkEmail", applicationRepository.getChkEmail(params));

        return returnMap;
    }

    @Override
    public void setUserAgree(Map<String, Object> params) {
        applicationRepository.setUserAgree(params);
    }

    @Override
    public Map<String, Object> getApplicationForm1(Map<String, Object> params) {
        Map<String, Object> searchMap = new HashMap<>();

        Map<String, Object> returnMap = applicationRepository.getApplicationForm1(params);
        searchMap.put("fileNo", returnMap.get("PHOTO_FILE"));
        returnMap.put("photoFile", applicationRepository.getApplicationFileInfo(searchMap));
        searchMap.put("fileNo", returnMap.get("ARMI_FILE"));
        returnMap.put("armiFile", applicationRepository.getApplicationFileInfo(searchMap));

        return returnMap;
    }

    @Override
    public void setApplicationFile(Map<String, Object> params, MultipartFile file, String serverDir, String baseDir) {
        /**
         * 인적성 검사 파일
         */
        MainLib mainLib = new MainLib();
        Map<String, Object> fileMap = new HashMap<>();
        if(file != null){
            fileMap = mainLib.fileUpload(file, filePath(params, serverDir));
            fileMap.put("applicationId", params.get("applicationId"));
            fileMap.put("contentId", "file_" + params.get("applicationId"));
            fileMap.put("fileCd", "application");
            fileMap.put("fileOrgName", fileMap.get("orgFilename").toString().split("[.]")[0]);
            fileMap.put("filePath", filePath(params, baseDir));
            fileMap.put("fileExt", fileMap.get("orgFilename").toString().split("[.]")[1]);
            fileMap.put("empSeq", params.get("empSeq"));
            commonRepository.insOneFileInfo(fileMap);

            fileMap.put("fileNo", fileMap.get("file_no"));
            fileMap.put("column", "PERSON_FILE");
            applicationRepository.setApplicationFileUpd(fileMap);
        }
    }

    @Override
    public void setApplicationForm1(Map<String, Object> params, MultipartFile photoFile, MultipartFile armiFile, String serverDir, String baseDir) {
        applicationRepository.setApplicationForm1Upd(params);

        /**
         * 증명사진
         */
        MainLib mainLib = new MainLib();
        Map<String, Object> fileMap = new HashMap<>();
        if(photoFile != null){
            fileMap = mainLib.fileUpload(photoFile, filePath(params, serverDir));
            fileMap.put("applicationId", params.get("applicationId"));
            fileMap.put("contentId", "photoFile_" + params.get("applicationId"));
            fileMap.put("fileCd", "application");
            fileMap.put("fileOrgName", fileMap.get("orgFilename").toString().split("[.]")[0]);
            fileMap.put("filePath", filePath(params, baseDir));
            fileMap.put("fileExt", fileMap.get("orgFilename").toString().split("[.]")[1]);
            fileMap.put("empSeq", params.get("userEmail"));
            commonRepository.insOneFileInfo(fileMap);

            fileMap.put("fileNo", fileMap.get("file_no"));
            fileMap.put("column", "PHOTO_FILE");
            applicationRepository.setApplicationFileUpd(fileMap);
        }


        /**
         * 증빙파일
         */
        if(armiFile != null){
            fileMap = mainLib.fileUpload(armiFile, filePath(params, serverDir));
            fileMap.put("applicationId", params.get("applicationId"));
            fileMap.put("contentId", "armi_" + params.get("applicationId"));
            fileMap.put("fileCd", "application");
            fileMap.put("fileOrgName", fileMap.get("orgFilename").toString().split("[.]")[0]);
            fileMap.put("filePath", filePath(params, baseDir));
            fileMap.put("fileExt", fileMap.get("orgFilename").toString().split("[.]")[1]);
            fileMap.put("empSeq", params.get("userEmail"));
            commonRepository.insOneFileInfo(fileMap);

            fileMap.put("fileNo", fileMap.get("file_no"));
            fileMap.put("column", "ARMI_FILE");
            applicationRepository.setApplicationFileUpd(fileMap);
        }
    }

    @Override
    public void setApplicationForm2(Map<String, Object> params, MultipartHttpServletRequest request, String serverDir, String baseDir) {
        applicationRepository.setApplicationSchoolDel(params);
        applicationRepository.setApplicationCareerDel(params);

        Gson gson = new Gson();
        List<Map<String, Object>> schoolArr = gson.fromJson((String) params.get("schoolArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());
        if(schoolArr.size() > 0){
            for(int i = 0; i < schoolArr.size(); i++){
                applicationRepository.setApplicationSchool(schoolArr.get(i));

                MainLib mainLib = new MainLib();
                Map<String, Object> fileMap = new HashMap<>();

                MultipartFile degreeFile = request.getFile("degreeFile" + i);

                if(!StringUtils.isEmpty(schoolArr.get(i).get("schoolBaseId"))){
                    /** 학위증빙 파일 업데이트 */
                    Map<String, Object> updateMap = new HashMap<>();
                    updateMap.put("originId", "degreeFile_" + schoolArr.get(i).get("schoolBaseId"));
                    updateMap.put("newId", "degreeFile_" + schoolArr.get(i).get("applicationSchoolId"));
                    commonRepository.setContentIdUpd(updateMap);

                    fileMap.put("fileNo", schoolArr.get(i).get("degreeFileNo"));
                    fileMap.put("column", "DEGREE_FILE");
                    fileMap.put("applicationSchoolId", schoolArr.get(i).get("applicationSchoolId"));
                    applicationRepository.setApplicationSchoolFileUpd(fileMap);

                    /** 성적증빙 파일 업데이트 */
                    updateMap.put("originId", "sexualFile_" + schoolArr.get(i).get("schoolBaseId"));
                    updateMap.put("newId", "sexualFile_" + schoolArr.get(i).get("applicationSchoolId"));
                    commonRepository.setContentIdUpd(updateMap);

                    fileMap.put("fileNo", schoolArr.get(i).get("sexualFileNo"));
                    fileMap.put("column", "SEXUAL_FILE");
                    fileMap.put("applicationSchoolId", schoolArr.get(i).get("applicationSchoolId"));
                    applicationRepository.setApplicationSchoolFileUpd(fileMap);
                }

                if(degreeFile != null){
                    fileMap = mainLib.fileUpload(degreeFile, filePath(params, serverDir));
                    fileMap.put("applicationId", params.get("applicationId"));
                    fileMap.put("contentId", "degreeFile_" + schoolArr.get(i).get("applicationSchoolId"));
                    fileMap.put("fileCd", "application");
                    fileMap.put("fileOrgName", fileMap.get("orgFilename").toString().split("[.]")[0]);
                    fileMap.put("filePath", filePath(params, baseDir));
                    fileMap.put("fileExt", fileMap.get("orgFilename").toString().split("[.]")[1]);
                    fileMap.put("empSeq", params.get("userEmail"));
                    commonRepository.insOneFileInfo(fileMap);

                    fileMap.put("fileNo", fileMap.get("file_no"));
                    fileMap.put("column", "DEGREE_FILE");
                    fileMap.put("column2", "DEGREE_FILE_UPD_CK");
                    fileMap.put("checked", "Y");
                    fileMap.put("applicationSchoolId", schoolArr.get(i).get("applicationSchoolId"));
                    applicationRepository.setApplicationSchoolFileUpd(fileMap);
                }

                MultipartFile sexualFile = request.getFile("sexualFile" + i);
                if(sexualFile != null){
                    fileMap = mainLib.fileUpload(sexualFile, filePath(params, serverDir));
                    fileMap.put("applicationId", params.get("applicationId"));
                    fileMap.put("contentId", "sexualFile_" + schoolArr.get(i).get("applicationSchoolId"));
                    fileMap.put("fileCd", "application");
                    fileMap.put("fileOrgName", fileMap.get("orgFilename").toString().split("[.]")[0]);
                    fileMap.put("filePath", filePath(params, baseDir));
                    fileMap.put("fileExt", fileMap.get("orgFilename").toString().split("[.]")[1]);
                    fileMap.put("empSeq", params.get("userEmail"));
                    commonRepository.insOneFileInfo(fileMap);

                    fileMap.put("fileNo", fileMap.get("file_no"));
                    fileMap.put("column", "SEXUAL_FILE");
                    fileMap.put("column2", "SEXUAL_FILE_UPD_CK");
                    fileMap.put("checked", "Y");
                    fileMap.put("applicationSchoolId", schoolArr.get(i).get("applicationSchoolId"));
                    applicationRepository.setApplicationSchoolFileUpd(fileMap);
                }
            }
        }

        List<Map<String, Object>> careerArr = gson.fromJson((String) params.get("careerArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());
        if(careerArr.size() > 0){
            for(int i = 0; i < careerArr.size(); i++){
                applicationRepository.setApplicationCareer(careerArr.get(i));

                MainLib mainLib = new MainLib();
                Map<String, Object> fileMap = new HashMap<>();

                MultipartFile careerFile = request.getFile("careerFile" + i);

                if(!StringUtils.isEmpty(careerArr.get(i).get("careerBaseId"))){
                    Map<String, Object> updateMap = new HashMap<>();
                    updateMap.put("originId", "careerFile_" + careerArr.get(i).get("careerBaseId"));
                    updateMap.put("newId", "careerFile_" + careerArr.get(i).get("applicationCareerId"));
                    commonRepository.setContentIdUpd(updateMap);

                    fileMap.put("fileNo", careerArr.get(i).get("careerFileNo"));
                    fileMap.put("column", "CAREER_FILE");
                    fileMap.put("applicationCareerId", careerArr.get(i).get("applicationCareerId"));
                    applicationRepository.setApplicationCareerFileUpd(fileMap);
                }

                if(careerFile != null){
                    fileMap = mainLib.fileUpload(careerFile, filePath(params, serverDir));
                    fileMap.put("applicationId", params.get("applicationId"));
                    fileMap.put("contentId", "careerFile_" + careerArr.get(i).get("applicationCareerId"));
                    fileMap.put("fileCd", "application");
                    fileMap.put("fileOrgName", fileMap.get("orgFilename").toString().split("[.]")[0]);
                    fileMap.put("filePath", filePath(params, baseDir));
                    fileMap.put("fileExt", fileMap.get("orgFilename").toString().split("[.]")[1]);
                    fileMap.put("empSeq", params.get("userEmail"));
                    commonRepository.insOneFileInfo(fileMap);

                    fileMap.put("fileNo", fileMap.get("file_no"));
                    fileMap.put("column", "CAREER_FILE");
                    fileMap.put("column2", "CAREER_FILE_UPD_CK");
                    fileMap.put("checked", "Y");
                    fileMap.put("applicationCareerId", careerArr.get(i).get("applicationCareerId"));
                    applicationRepository.setApplicationCareerFileUpd(fileMap);
                }
            }
        }
    }

    @Override
    public Map<String, Object> getApplicationForm2(Map<String, Object> params) {
        Map<String, Object> returnMap = applicationRepository.getApplicationForm1(params);
        List<Map<String, Object>> schoolList = applicationRepository.getApplicationSchool(params);
        for(Map<String, Object> map : schoolList){
            Map<String, Object> searchMap = new HashMap<>();
            searchMap.put("fileNo", map.get("DEGREE_FILE"));
            map.put("degreeFile", commonRepository.getContentFileOne(searchMap));
            searchMap.put("fileNo", map.get("SEXUAL_FILE"));
            map.put("sexualFile", commonRepository.getContentFileOne(searchMap));
        }
        returnMap.put("school", schoolList);

        List<Map<String, Object>> careerList = applicationRepository.getApplicationCareer(params);
        for(Map<String, Object> map : careerList){
            Map<String, Object> searchMap = new HashMap<>();
            searchMap.put("fileNo", map.get("CAREER_FILE"));
            map.put("careerFile", commonRepository.getContentFileOne(searchMap));
        }
        returnMap.put("career", careerList);

        return returnMap;
    }

    @Override
    public void setApplicationForm3(Map<String, Object> params, MultipartHttpServletRequest request, String serverDir, String baseDir) {
        applicationRepository.setApplicationCertDel(params);
        applicationRepository.setApplicationLangDel(params);
        applicationRepository.setApplicationOtherLang(params);

        Gson gson = new Gson();
        MainLib mainLib = new MainLib();
        List<Map<String, Object>> certArr = gson.fromJson((String) params.get("certArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());
        if(certArr.size() > 0){
            for(int i = 0; i < certArr.size(); i++){
                applicationRepository.setApplicationCert(certArr.get(i));

                Map<String, Object> fileMap = new HashMap<>();

                MultipartFile certFile = request.getFile("certFile" + i);
                if(certFile != null){
                    fileMap = mainLib.fileUpload(certFile, filePath(params, serverDir));
                    fileMap.put("applicationId", params.get("applicationId"));
                    fileMap.put("contentId", "certFile_" + certArr.get(i).get("applicationCertId"));
                    fileMap.put("fileCd", "application");
                    fileMap.put("fileOrgName", fileMap.get("orgFilename").toString().split("[.]")[0]);
                    fileMap.put("filePath", filePath(params, baseDir));
                    fileMap.put("fileExt", fileMap.get("orgFilename").toString().split("[.]")[1]);
                    fileMap.put("empSeq", params.get("userEmail"));
                    commonRepository.insOneFileInfo(fileMap);

                    fileMap.put("fileNo", fileMap.get("file_no"));
                    fileMap.put("column", "CERT_FILE");
                    fileMap.put("applicationCertId", certArr.get(i).get("applicationCertId"));
                    applicationRepository.setApplicationCertFileUpd(fileMap);
                }

                if(!StringUtils.isEmpty(certArr.get(i).get("certBaseId"))){
                    Map<String, Object> updateMap = new HashMap<>();
                    updateMap.put("originId", "certFile_" + certArr.get(i).get("certBaseId"));
                    updateMap.put("newId", "certFile_" + certArr.get(i).get("applicationCertId"));
                    commonRepository.setContentIdUpd(updateMap);

                    fileMap.put("fileNo", certArr.get(i).get("certFileNo"));
                    fileMap.put("column", "CERT_FILE");
                    fileMap.put("applicationCertId", certArr.get(i).get("applicationCertId"));
                    applicationRepository.setApplicationCertFileUpd(fileMap);
                }
            }
        }

        List<Map<String, Object>> langArr = gson.fromJson((String) params.get("langArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());
        if(langArr.size() > 0){
            for(int i = 0; i < langArr.size(); i++){
                applicationRepository.setApplicationLang(langArr.get(i));

                Map<String, Object> fileMap = new HashMap<>();

                MultipartFile langFile = request.getFile("langFile" + i);
                if(langFile != null){
                    fileMap = mainLib.fileUpload(langFile, filePath(params, serverDir));
                    fileMap.put("applicationId", params.get("applicationId"));
                    fileMap.put("contentId", "langFile_" + langArr.get(i).get("applicationLangId"));
                    fileMap.put("fileCd", "application");
                    fileMap.put("fileOrgName", fileMap.get("orgFilename").toString().split("[.]")[0]);
                    fileMap.put("filePath", filePath(params, baseDir));
                    fileMap.put("fileExt", fileMap.get("orgFilename").toString().split("[.]")[1]);
                    fileMap.put("empSeq", params.get("userEmail"));
                    commonRepository.insOneFileInfo(fileMap);

                    fileMap.put("fileNo", fileMap.get("file_no"));
                    fileMap.put("column", "LANG_FILE");
                    fileMap.put("applicationLangId", langArr.get(i).get("applicationLangId"));
                    applicationRepository.setApplicationLangFileUpd(fileMap);
                }

                if(!StringUtils.isEmpty(langArr.get(i).get("langBaseId"))){
                    Map<String, Object> updateMap = new HashMap<>();
                    updateMap.put("originId", "langFile_" + langArr.get(i).get("langBaseId"));
                    updateMap.put("newId", "langFile_" + langArr.get(i).get("applicationLangId"));
                    commonRepository.setContentIdUpd(updateMap);

                    fileMap.put("fileNo", langArr.get(i).get("langFileNo"));
                    fileMap.put("column", "LANG_FILE");
                    fileMap.put("applicationLangId", langArr.get(i).get("applicationLangId"));
                    applicationRepository.setApplicationLangFileUpd(fileMap);
                }
            }
        }
    }

    @Override
    public Map<String, Object> getApplicationForm3(Map<String, Object> params) {
        Map<String, Object> returnMap = applicationRepository.getApplicationForm1(params);
        List<Map<String, Object>> certList = applicationRepository.getApplicationCert(params);
        for(Map<String, Object> map : certList){
            Map<String, Object> searchMap = new HashMap<>();
            searchMap.put("fileNo", map.get("CERT_FILE"));
            map.put("certFile", commonRepository.getContentFileOne(searchMap));
        }
        returnMap.put("cert", certList);

        List<Map<String, Object>> langList = applicationRepository.getApplicationLang(params);
        for(Map<String, Object> map : langList){
            Map<String, Object> searchMap = new HashMap<>();
            searchMap.put("fileNo", map.get("LANG_FILE"));
            map.put("langFile", commonRepository.getContentFileOne(searchMap));
        }
        returnMap.put("lang", langList);


        return returnMap;
    }

    @Override
    public void setApplicationIntroduce(Map<String, Object> params) {
        applicationRepository.setApplicationIntroduceUpd(params);
    }

    @Override
    public Map<String, Object> getApplicationIntroduce(Map<String, Object> params) {
        return applicationRepository.getApplicationIntroduce(params);
    }

    private String filePath (Map<String, Object> params, String base_dir){
        String path = base_dir + "application/" + params.get("applicationId") + "/";
        return path;
    }

    @Override
    public List<Map<String, Object>> getApplicationByRecruitArea(Map<String, Object> params) {
        return applicationRepository.getApplicationByRecruitArea(params);
    }

}
