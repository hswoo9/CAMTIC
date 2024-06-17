package egovframework.com.devjitsu.common.controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;

import dev_jitsu.MainLib;
import egovframework.com.devjitsu.common.utiles.Coordinates;
import egovframework.com.devjitsu.common.utiles.MailUtil;
import egovframework.com.devjitsu.common.utiles.MapUtil;
import egovframework.com.devjitsu.doc.approval.service.ApprovalService;
import egovframework.com.devjitsu.common.service.CommonService;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.hp.board.service.BoardService;
import org.apache.commons.io.FileUtils;
import org.json.JSONArray;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.*;
import java.net.URLEncoder;
import java.util.*;
import java.util.stream.Collectors;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@Controller
public class CommonController {
    private static final Logger logger = LoggerFactory.getLogger(CommonController.class);

    @Autowired
    private CommonService commonService;

    @Autowired
    private BoardService boardService;

    @Autowired
    private ApprovalService approvalService;

    @Value("#{properties['File.Server.Dir']}")
    private String SERVER_DIR;

    @Value("#{properties['File.Server.Path']}")
    private String SERVER_PATH;

    @Value("#{properties['File.Base.Directory']}")
    private String BASE_DIR;


    @Value("#{properties['Dev.Mail.SMTPName']}")
    private String SMTPName;
    @Value("#{properties['Dev.Mail.SMTPMail']}")
    private String SMTPMail;
    @Value("#{properties['Dev.Mail.SMTPServer']}")
    private String SMTPServer;
    @Value("#{properties['Dev.Mail.SMTPPort']}")
    private int SMTPPort;
    @Value("#{properties['Dev.Mail.SMTPID']}")
    private String SMTPID;
    @Value("#{properties['Dev.Mail.SMTPPW']}")
    private String SMTPPW;
    @Value("#{properties['Dev.Mail.MailPath']}")
    private String MailPath;

    @RequestMapping(value = "/common/fileDownload.do")
    public void fileDownload(@RequestParam Map<String, Object> params, HttpServletRequest request, HttpServletResponse response) throws Exception {
        String fileName = params.get("fileName") != null ? String.valueOf(params.get("fileName")) : "";
        String filePath = params.get("filePath") != null ? String.valueOf(params.get("filePath")) : "";
        String fileType = params.get("fileType") != null ? String.valueOf(params.get("fileType")) : "";

        commonService.fileDownLoad(fileName, filePath, fileType, request, response);
    }

    @RequestMapping(value = "/common/empInformation", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> empInformation(@RequestParam Map<String, Object> map){

        Map<String, Object> resultMap = new HashMap<String, Object>();

        resultMap.put("list", commonService.getUserList(map)); //리스트
        if(map.containsKey("pageSize")){
            resultMap.put("totalCount", commonService.getUserListTotal(map)); //토탈
        }

        return resultMap;
    }

    @RequestMapping("/common/deptListPop.do")
    public String deptListLine(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("data", commonService.ctDept((String) loginVO.getOrgnztId()));
        model.addAttribute("params", params);
        model.addAttribute("loginVO", loginVO);

        return "popup/common/deptListPop";
    }


    @RequestMapping("/common/deptMultiPop.do")
    public String deptMultiLine(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("data", commonService.ctDept((String) loginVO.getOrgnztId()));
        model.addAttribute("loginVO", loginVO);

        return "popup/common/deptMultiPop";
    }

    @RequestMapping(value = "/common/commonFileDel")
    public String commonFileDel(@RequestParam Map<String, Object> params, HttpServletResponse response, Model model){
        model.addAttribute("rs", commonService.getContentFileOne(params));
        return "jsonView";
    }

    /**
     * 코드 가져오기
     * @param params
     *        cmGroupCode
     * @return table
     *        DJ_COM_CODE JOIN DJ_COM_GROUP_CODE
     */
    @RequestMapping("/common/commonCodeList")
    public String commonCodeList(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("rs", commonService.commonCodeList(params));

        return "jsonView";
    }

    /**
     * dept Tree view
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/common/organizationMakeTreeView.do")
    public String makeTreeView(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("data", commonService.ctDept(""));
        return "jsonView";
    }

    /**
     * 부서 생성/수정
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/common/setDeptInfo.do")
    public String setDeptInfo(@RequestParam Map<String, Object> params, Model model){
        commonService.setDeptInfo(params);
        return "jsonView";
    }

    /**
     * 부서 삭제
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/common/setDeptInfoDel.do")
    public String setDeptInfoDel(@RequestParam Map<String, Object> params, Model model){
        commonService.setDeptInfoDel(params);
        return "jsonView";
    }

    @RequestMapping("/common/teamList")
    public String teamList(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("list", commonService.teamList(params));

        return "jsonView";
    }

    @RequestMapping("/common/delFileInfo")
    public String delFileInfo(@RequestParam Map<String, Object> params, Model model){
        try{
            commonService.getContentFileDelOne(params);

            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping(value = "/common/multiFileDownload.do")
    public void multiFileDownload(@RequestParam Map<String, Object> params, HttpServletResponse response, Model model, HttpServletRequest request) throws UnsupportedEncodingException {
        MainLib mainLib = new MainLib();
        List<Map<String, Object>> result = new ArrayList<>();
        String dir = "";
        String zipName = "";

        if(!StringUtils.isEmpty(params.get("type"))){
            if(params.get("type").equals("approval")){
                if(params.containsKey("contentId")){
                    result = approvalService.getOnnaraDocAttachmentList(params);
                }else{
                    params.put("type", params.get("docMenuCd"));
                    result = approvalService.getDocAttachmentList(params);
                }

                if(result.size() > 0){
                    for(int i = 0; i < result.size(); i++){
                        if(result.get(i).get("FILE_DOWN_PATH").toString().contains("nas1")) {
                            dir = result.get(i).get("FILE_DOWN_PATH").toString();
                        } else {
                            if(result.get(i).get("FILE_DOWN_PATH").toString().indexOf("218.158.231.184") > -1){
                                result.get(i).put("FILE_DOWN_PATH", result.get(i).get("FILE_DOWN_PATH").toString().split("218.158.231.184")[1]);
                            } else if(result.get(i).get("FILE_DOWN_PATH").toString().indexOf("218.158.231.186") > -1){
                                result.get(i).put("FILE_DOWN_PATH", result.get(i).get("FILE_DOWN_PATH").toString().split("218.158.231.186")[1]);
                            }
                            dir = SERVER_PATH + result.get(i).get("FILE_DOWN_PATH").toString();
                        }

                        result.get(i).put("dir", dir);
                    }
                    zipName = URLEncoder.encode(result.get(0).get("ZIP_NAME").toString(), "UTF-8");
                }
                multiFileDownload(result, dir, zipName, response);
                return;
            }else if(params.get("type").equals("board")){
                result = boardService.getArticleFileList(params);
                if(result.size() > 0){
                    dir = SERVER_PATH + result.get(0).get("FILE_PATH").toString();
                    zipName = URLEncoder.encode(result.get(0).get("BOARD_ARTICLE_TITLE").equals("") || result.get(0).get("BOARD_ARTICLE_TITLE") == null ?  "제목없음" : result.get(0).get("BOARD_ARTICLE_TITLE").toString(), "UTF-8");
                }
            }
        }
        mainLib.multiFileDownload(result, dir, zipName, response);
    }

    public void multiFileDownload(List<Map<String, Object>> list, String dir, String zipName, HttpServletResponse response) {
        ZipOutputStream zout = null;
        if (list.size() > 0) {
            try {
                zout = new ZipOutputStream(new FileOutputStream(dir + zipName + ".zip"));
                byte[] buffer = new byte[1024];
                FileInputStream in = null;
                Iterator var8 = list.iterator();

                while(var8.hasNext()) {
                    try{
                        Map<String, Object> map = (Map)var8.next();
                        in = new FileInputStream(map.get("dir").toString() + map.get("fileUUID"));
                        zout.putNextEntry(new ZipEntry(map.get("filename").toString()));

                        int len;
                        while((len = in.read(buffer)) > 0) {
                            zout.write(buffer, 0, len);
                        }

                        zout.closeEntry();
                        in.close();
                    } catch(Exception e){

                    }

                }

                zout.close();
                byte[] fileByte = FileUtils.readFileToByteArray(new File(dir + zipName + ".zip"));
                response.setContentType("application/octet-stream");
                response.setHeader("Content-Disposition", "attachment; filename=\"" + zipName + ".zip\";");
                response.getOutputStream().write(fileByte);
            } catch (IOException var11) {
                var11.printStackTrace();
            }
        }

    }

    @RequestMapping ("/common/getDept.do")
    public String getDept (@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("rs", commonService.getDept(params));
        return "jsonView";
    }

    /**
     * 알림 리스트
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/common/getAlarmList.do")
    public String getAlarmList(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        if(loginVO == null){
            return "redirect:/loginPage.do";
        }
        params.put("empSeq", loginVO.getUniqId());
        model.addAttribute("rs", commonService.getAlarmList(params));

        return "jsonView";
    }


    /**
     * 알람전송
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/common/setAlarm")
    public String setAlarm(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        params.put("sdEmpSeq", loginVO.getUniqId());
        params.put("SND_EMP_NM", loginVO.getName());
        params.put("SND_DEPT_SEQ", loginVO.getOrgnztId());
        params.put("SND_DEPT_NM", loginVO.getOrgnztNm());

        try {
            commonService.setAlarm(params);
            model.addAttribute("rs", "SUCCESS");
            model.addAttribute("alId", params.get("alId"));
            model.addAttribute("message", "Successful sending of notifications.");
        } catch (DataAccessException de){
            de.printStackTrace();
        }

        return "jsonView";
    }

    /**
     * 알림확인
     * @param params
     * @return
     */
    @RequestMapping("/common/setAlarmCheck.do")
    public String setAlarmCheck(@RequestParam Map<String, Object> params){
        commonService.setAlarmCheck(params);
        return "jsonView";
    }

    /**
     * 알림 상단리스트 삭제
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/common/setAlarmTopListDel.do")
    public String setAlarmTopListDel(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        params.put("rcvEmpSeq", loginVO.getUniqId());
        commonService.setAlarmTopListDel(params);

        return "jsonView";
    }

    /**
     * 알림 전체읽음
     * @param params
     * @param request
     * @return
     */
    @RequestMapping("/common/setAlarmAllCheck.do")
    public String setAlarmAllCheck(@RequestParam Map<String, Object> params, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        params.put("empSeq", loginVO.getUniqId());
        commonService.setAlarmAllCheck(params);

        return "jsonView";
    }

    /** 사용자 비밀번호 암호화 */
    @RequestMapping("/common/setPasswordEncryption")
    public void setPasswordEncryption(@RequestParam Map<String, Object> params){
        commonService.setPasswordEncryption(params);
    }

    @RequestMapping ("/common/getFileInfo")
    public String getFileInfo (@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("data", commonService.getFileInfo(params));
        return "jsonView";
    }

    @RequestMapping ("/common/getFileList")
    public String getFileList (@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("list", commonService.getFileList(params));
        return "jsonView";
    }

    @RequestMapping("/common/sendMail")
    public String sendMail(@RequestParam Map<String, Object> params, Model model) throws MessagingException {



        MailUtil mailUtil = new MailUtil();
        mailUtil.sendMail(params, SMTPServer, SMTPPort, SMTPID, SMTPPW);

        model.addAttribute("rs", "SUCCESS");
        return "jsonView";
    }

    @RequestMapping("/common/findMap")
    public String testMap(@RequestParam Map<String, Object> params, Model model) {
        MapUtil mapUtil = new MapUtil();
        JSONArray doc = mapUtil.getCoordinate(params);

        Gson gson = new Gson();
        List<Map<String, Object>> docListMap = gson.fromJson(doc.toString(), new TypeToken<List<Map<String, Object>>>() {}.getType());

        model.addAttribute("route", docListMap);
        return "jsonView";
    }

    @RequestMapping("/common/commonBudgetCode.do")
    public String commonBudgetCode(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "system/code/commonBudgetCode";
    }

    @RequestMapping("/common/getJangCodeList")
    public String getJangCodeList(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("list", commonService.getJangCodeList(params));

        return "jsonView";
    }

    @RequestMapping("/common/getGwanCodeList")
    public String getGwanCodeList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", commonService.getGwanCodeList(params));

        return "jsonView";
    }

    @RequestMapping("/common/getHangCodeList")
    public String getHangCodeList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", commonService.getHangCodeList(params));

        return "jsonView";
    }

    @RequestMapping("/common/pop/jangReqPop.do")
    public String jangReqPop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/common/jangReqPop";
    }

    @RequestMapping("/common/pop/gwanReqPop.do")
    public String gwanReqPop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/common/gwanReqPop";
    }

    @RequestMapping("/common/pop/hangReqPop.do")
    public String hangReqPop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/common/hangReqPop";
    }

    @RequestMapping("/common/getJangInfo")
    public String getJangInfo(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("map", commonService.getJangInfo(params));

        return "jsonView";
    }

    @RequestMapping("/common/getGwanInfo")
    public String getGwanInfo(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("map", commonService.getGwanInfo(params));

        return "jsonView";
    }

    @RequestMapping("/common/getHangInfo")
    public String getHangInfo(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("map", commonService.getHangInfo(params));

        return "jsonView";
    }


    @RequestMapping("/common/setJangInfo")
    public String setJangInfo(@RequestParam Map<String, Object> params, Model model){
        try{
            commonService.setJangInfo(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }


    @RequestMapping("/common/setGwanInfo")
    public String setGwanInfo(@RequestParam Map<String, Object> params, Model model){
        try{
            commonService.setGwanInfo(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }


    @RequestMapping("/common/setHangInfo")
    public String setHangInfo(@RequestParam Map<String, Object> params, Model model){
        try{
            commonService.setHangInfo(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/common/delBudgetCode")
    public String delBudgetCode(@RequestParam Map<String, Object> params, Model model){
        try{
            commonService.delBudgetCode(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }



}
