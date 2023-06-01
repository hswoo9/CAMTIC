package egovframework.com.devjitsu.common.utiles;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.StringUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.nio.file.*;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class ConvertUtil {

    @Value("${File.Server.Path}")
    private String SERVER_PATH;

    public Map<String, Object> StringToFileConverter(String docFileStr, String ext, Map<String, Object> params, String base_dir, String prevFile){
        HttpServletRequest servletRequest = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        Map<String, Object> result = new HashMap<>();

        try {
            String fileUUID = UUID.randomUUID() + "." + ext;
            String docFilepath = approveDocFilePath(servletRequest, params, base_dir);

            if(servletRequest.getServerName().contains("localhost") || servletRequest.getServerName().contains("127.0.0.1")){
                CommFileUtil CommFileUtil = new CommFileUtil();
                CommFileUtil.setServerFileDel(docFilepath, prevFile);

                Map<String, Object> commMap = CommFileUtil.setServerSFSave(docFileStr, docFilepath, params.get("docFileName").toString(), ext);

                result.put("fileUUID", commMap.get("fileUUID"));
                result.put("fileOrgName", commMap.get("fileOrgName"));
                result.put("filePath", commMap.get("filePath").toString().replace("\\\\", "//").replace("\\", "/"));
                result.put("fileHostAddress", commMap.get("fileHostAddress"));
            }else{
                if(prevFile != ""){
                    CommonUtil commonUtil = new CommonUtil();
                    boolean isDelete = commonUtil.deleteFile(new String[]{prevFile}, docFilepath);

                    if(!isDelete){
                        throw new Exception();
                    }
                }

                File newPath = new File(docFilepath);
                if (!newPath.exists()) {
                    newPath.mkdirs();
                }

                File lOutFile = new File(docFilepath + "/" + fileUUID);
                FileOutputStream lFileOutputStream = new FileOutputStream(lOutFile);
                lFileOutputStream.write(docFileStr.getBytes());
                lFileOutputStream.close();

                result.put("fileUUID", fileUUID);
                result.put("filePath", dbFilePath(servletRequest, params, base_dir));
                result.put("fileOrgName", params.get("docFileName").toString().split("[.]")[0]);
                result.put("fileHostAddress", "server");
            }

            result.put("empSeq", params.get("empSeq"));
            result.put("fileCd", params.get("menuCd"));
            result.put("fileExt", ext);
            result.put("fileSize", docFileStr.getBytes().length);

        } catch (IOException var6) {
            var6.printStackTrace();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return result;
    }

    public Map<String, Object> blobToPdfConverterApproveNReturn(MultipartFile docFile, Map<String, Object> params){
        Map<String, Object> result = new HashMap<>();

        try {
            String docFileName = params.get("docFileName").toString();
            String docFilepath = params.get("docFilePath").toString();

            CommonUtil commonUtil = new CommonUtil();
            boolean isDelete = commonUtil.deleteFile(new String[]{params.get("docFileName").toString()}, params.get("docFilePath").toString());

            if(isDelete){
                InputStream inputStream = new ByteArrayInputStream(docFile.getBytes());
                Path path = Paths.get(docFilepath + docFileName);
                Files.copy(inputStream, path, new CopyOption[]{StandardCopyOption.REPLACE_EXISTING});

                result.put("fileNo", params.get("fileNo"));
                result.put("fileSize", docFile.getBytes().length);
            }else{
                throw new IOException();
            }
        } catch (IOException var6) {
            var6.printStackTrace();
        }

        return result;
    }

    public String htmlToStringConverter(MultipartFile formFile) throws IOException {
        File file = new File(formFile.getOriginalFilename());
        formFile.transferTo(file);
        Document doc = Jsoup.parse(file, "UTF-8");
        String html = String.valueOf(doc.body());

        return html;
    }

    public String randomUUID(String str) {
        UUID uuid = UUID.randomUUID();
        String strUUID = uuid.toString().toString().replaceAll("-", "") + str;
        return strUUID;
    }

    public String approveDocFilePath(HttpServletRequest servletRequest, Map<String, Object> params, String base_dir){
        String path = "";

        if(!StringUtils.isEmpty(params.get("docId"))){
            path = "approveDocFile/" + params.get("menuCd").toString()+"/" + params.get("docId");
        }else{
            path = "approveDocFile/" + params.get("menuCd").toString()+"/" + params.get("DOC_ID");
        }

        if(servletRequest.getServerName().contains("localhost") || servletRequest.getServerName().contains("127.0.0.1")){
        }else if (servletRequest.getServerName().contains("218.158.231.186")){
            path = "/home" + base_dir + path + "/";
        }else{
            path = "/data" + base_dir + path + "/";
        }

        return path;
    }

    private String dbFilePath(HttpServletRequest request, Map<String, Object> params, String base_dir){
        String path = "";

        String devUrl = "http:\\\\218.158.231.186:8080";
        String prodUrl = "http:\\\\218.158.231.186:8080";

        if(request.getServerName().contains("localhost") || request.getServerName().contains("127.0.0.1") || request.getServerName().contains("218.158.231.186")){
            path = devUrl + base_dir + "approveDocFile/" + params.get("menuCd");
        }else{
            path = prodUrl + base_dir + "approveDocFile/" + params.get("menuCd");
        }

        if(!StringUtils.isEmpty(params.get("docId"))){
            path += "/" + params.get("docId") + "/";
        }else{
            path += "/" + params.get("DOC_ID") + "/";
        }

        return path.replace("\\\\", "//");
    }
}
