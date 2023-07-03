package egovframework.com.devjitsu.common.utiles;

import com.jcraft.jsch.*;
import egovframework.com.devjitsu.common.repository.CommFileDAO;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class CommFileUtil {
    private static final Logger logger = LoggerFactory.getLogger(CommFileUtil.class);

    public static String getFilePath(CommFileDAO commFileDAO, String path, String subPathYn) throws Exception {
        LoginVO loginVO = EgovUserDetailsHelper.getAuthenticatedUser();
        String osType = "linux";
        if(System.getProperty("os.name").toLowerCase().contains("windows")){
            osType = "windows";
        }
        Map<String, Object> param = new HashMap<String, Object>();
        param.put("groupSeq", loginVO.getGroupSeq());
        param.put("pathSeq", "0");
        param.put("osType", osType);
        Map<String, Object> pathMap = commFileDAO.selectGroupPath(param);
        String filePath = "";

        if(pathMap==null || pathMap.size() == 0){
            filePath = File.separator;
            if(osType.equals("windows")){
                filePath = "d:\\upload\\";
            }
        }else{
            filePath = pathMap.get("absol_path")+File.separator;
        }

        if(path != null && !"".equals(path)) {
            filePath = filePath+path+File.separator;
        }

        if("Y".equals(subPathYn)) {
            Calendar cal = Calendar.getInstance();
            String yyyy = String.valueOf(cal.get(Calendar.YEAR));
            String mm = String.valueOf(cal.get(Calendar.MONTH) + 1);
            String subPath = yyyy+File.separator+mm;
            filePath = filePath+subPath+File.separator;
        }

        return filePath;
    }

    public static void fileWrite(MultipartFile mFile, File saveFile) throws Exception {
        mFile.transferTo(saveFile);
    }

    public static void makeDir(String filePath) throws Exception {
        File dir = new File(filePath);
        if(!dir.isDirectory()){
            dir.mkdirs();
        }
    }

    public static void outputStream(HttpServletResponse response, FileInputStream in ) throws Exception {
        ServletOutputStream binaryOut = response.getOutputStream();
        byte buffer[] = new byte[8 * 1024];

        try {
            IOUtils.copy(in, binaryOut);
            binaryOut.flush();
        } catch ( Exception e ) {
        } finally {
            if (in != null) {
                try {
                    in.close();
                }catch(Exception e ) {}
            }
            if (binaryOut != null) {
                try {
                    binaryOut.close();
                }catch(Exception e ) {}
            }
        }
    }

    private String filePath (Map<String, Object> params, String base_dir){
        LocalDate now = LocalDate.now();
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        String fmtNow = now.format(fmt);

        String path = base_dir + params.get("menuCd").toString()+"/" + fmtNow + "/";

        return path;
    }


    private String uploadPath = "/usr/local/tomcat8/dj_camtic/upload/";
    private String ADDRESS = "218.158.231.186";
    private int PORT = 20022;
    private String USERNAME = "root";
    private String PASSWORD = "siwon12!@";
    private static Session session = null;
    private static Channel channel = null;
    private static ChannelSftp channelSftp = null;
    private long fileSize;

    public CommFileUtil() throws Exception {
        init();
    }

    public void init() throws Exception {
        JSch jsch = new JSch();
        session = jsch.getSession(USERNAME, ADDRESS, PORT);
        session.setPassword(PASSWORD);

        java.util.Properties config = new java.util.Properties();
        config.put("StrictHostKeyChecking", "no");
        session.setConfig(config);
        session.connect();
        channel = session.openChannel("sftp");
        channel.connect();

        channelSftp = (ChannelSftp) channel;
        boolean result = channelSftp.isConnected();  //접속여부를 리턴한다.(true/false)
        logger.info("접속여부 확인"+result);
    }


    public Map<String, Object> setServerMFSave(MultipartFile request, String basePath) {
        SftpATTRS attrs = null;

        String originFileName = null; // 원본파일이름
        String originFileExt  = null; // 원본 파일 확장자
        String storedFileName = null; // 저장될 이름
        String fileExt        = null; // 파일확장자

        Map<String, Object> listMap = null;

        String filePath = uploadPath + basePath;

        logger.info("========= filePath : "+filePath + " =========");

        // 경로 생성
        try {

            // 업로드할 파일이 있는지 체크
            if(!request.isEmpty() && request.getSize() > 0 && request != null) {
                MultipartFile multipartFile = request;

                boolean isUpload = false;

                // 파일용량 0이상만 업로드 ( 업로드사이즈 제한에 걸리지 않으면 업로드시작 )
                if(multipartFile.getSize() > 0) {
                    originFileName = multipartFile.getOriginalFilename();
                    originFileExt = originFileName.substring(originFileName.lastIndexOf("."));
                    logger.info("========= originFileName : "+originFileName + "========= ");

                    fileExt = originFileName.substring(originFileName.lastIndexOf(".") + 1, originFileName.length());
                    fileExt = fileExt.toLowerCase();
                    logger.info("========= fileExt : "+fileExt + "========= ");

                    if(fileExt != ""){
                        isUpload = true;
                    }

                    logger.info("========= isUpload : "+isUpload+" ========= ");

                    if(isUpload) {
                        //String serverFilePath = SERVER_DIR + basePath;
                        String serverFilePath = "/home/upload/" + basePath;

                        storedFileName = UUID.randomUUID() + originFileExt;
                        File originStoredFile = File.createTempFile(storedFileName.replace(originFileExt, ""), originFileExt);
                        multipartFile.transferTo(originStoredFile);

                        try {
                            attrs = channelSftp.stat(serverFilePath.replace("\\\\", "/").replace("\\", "/"));
                        }catch (Exception e){ }

                        if (attrs == null) {
                            channelSftp.mkdir(serverFilePath.replace("\\\\", "/").replace("\\", "/"));
                        }

                        channelSftp.cd(serverFilePath.replace("\\\\", "/").replace("\\", "/"));
                        channelSftp.put(new FileInputStream(originStoredFile), storedFileName);
                        originStoredFile.delete();

                        listMap = new HashMap<String, Object>();
                        listMap.put("fileExt", fileExt);
                        listMap.put("fileOrgName", originFileName.split("[.]")[0]);
                        listMap.put("fileUUID", storedFileName);
                        listMap.put("fileSize", multipartFile.getSize());
                        listMap.put("filePath", "http:\\\\218.158.231.186:8080\\upload\\" + basePath + "/");
                    }
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return listMap;
    }

    public Map<String, Object> setServerSFSave(String fileStr, String basePath, String fileName, String ext) {
        SftpATTRS attrs = null;

        String originFileName = fileName; // 원본파일이름
        String originFileExt  = ext; // 원본 파일 확장자
        String storedFileName = null; // 저장될 이름

        Map<String, Object> listMap = null;

        String filePath = uploadPath + basePath;

        try {
            storedFileName = UUID.randomUUID().toString();

            File file = File.createTempFile(storedFileName, "." + ext);
            FileOutputStream lFileOutputStream = new FileOutputStream(file);
            lFileOutputStream.write(fileStr.getBytes());
            lFileOutputStream.close();

            if(fileStr != "" && fileStr.length() > 0 && fileStr != null) {
                boolean isUpload = false;
                if(originFileExt != ""){
                    isUpload = true;
                }

                if(isUpload) {
                    String serverFilePath = "/home/upload/" + basePath;
//                    String serverFilePath = "/data/upload/" + basePath;


                    try {
                        attrs = channelSftp.stat(serverFilePath.replace("\\\\", "/").replace("\\", "/"));
                    }catch (Exception e){ }

                    if (attrs == null) {
                        channelSftp.mkdir(serverFilePath.replace("\\\\", "/").replace("\\", "/"));
                    }

                    channelSftp.cd(serverFilePath.replace("\\\\", "/").replace("\\", "/"));
                    channelSftp.put(new FileInputStream(file), storedFileName + "." + ext);
                    file.delete();

                    listMap = new HashMap<String, Object>();
                    listMap.put("fileOrgName", originFileName);
                    listMap.put("fileUUID", storedFileName + "." + ext);
                    listMap.put("filePath", "http:\\\\218.158.231.186:8080\\upload\\" + basePath + "/");
                    listMap.put("fileHostAddress", "localhost");
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return listMap;
    }

    public void setServerFileDel(String filePath, String fileName) {
        if(!fileName.equals("")){
            try {
                String serverFilePath = "/home/upload/" + filePath + "/" + fileName;

                channelSftp.rm(serverFilePath);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}