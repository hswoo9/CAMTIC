package egovframework.com.devjitsu.hp.board.controller;

import egovframework.com.devjitsu.gw.user.controller.UserController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import egovframework.com.devjitsu.hp.board.service.BoardService;
import egovframework.com.devjitsu.hp.board.util.ArticlePage;
import egovframework.com.devjitsu.hp.board.util.PagingResponse;
import egovframework.com.devjitsu.hp.board.util.PostResponse;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Controller
public class BoardController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private BoardService boardService;

    @Value("#{properties['File.Server.Dir']}")
    private String SERVER_DIR;

    @Value("#{properties['File.Base.Directory']}")
    private String BASE_DIR;

    @Value("#{properties['File.Slash']}")
    private String slash;

    /**
     * 공통게시판 페이지
     * */
    @RequestMapping("/camtic/news/commonBoard.do")
    public String commonBoard(Model model, @RequestParam Map<String, Object> param){

        model.addAttribute("categoryKey", param.get("categoryKey"));
        return "camtic/news/commonBoard";
    }

    /**
     * 게시판 TABLE DATA
     * */
    @RequestMapping("/board/getBoardArticleList.do")
    public String getNormalBoardList(@RequestParam Map<String, Object> param, ArticlePage articlePage, HttpServletRequest request, Model model){

        int recordSize = Integer.parseInt(String.valueOf(param.get("recordSize")));

        articlePage.setSearchCategory((String) param.get("categoryId"));
        articlePage.setSearchInput((String) param.get("searchInput"));
        articlePage.setRecordSize(recordSize);

        PagingResponse<PostResponse> response = boardService.selectBoardList(articlePage);

        model.addAttribute("boardArticleList", response);

        model.addAttribute("pagination", articlePage.getPagination());
        model.addAttribute("page", articlePage.getPage());
        /*model.addAttribute("boardCnt", boardService.selectBoardListCnt(articlePage));*/
        return "jsonView";
    }

    /**
     * 공지사항 상세보기 페이지
     * */
    @RequestMapping("/camtic/news/view.do")
    public String noticeView(Model model, HttpServletRequest request, @RequestParam Map<String, Object> params){
        boardService.setBoardArticleViewCount(params);

        Map<String, Object> map = boardService.selectBoard(params);
        List<Map<String, Object>> fileList = boardService.selectBoardFile(params);
        model.addAttribute("categoryId", params.get("category"));
        model.addAttribute("map", map);
        model.addAttribute("fileMap", fileList);
        return "camtic/news/view";
    }

    /**
     * 게시글 작성 페이지
     * */
    @RequestMapping("/camtic/news/write.do")
    public String noticeWrite(Model model, @RequestParam Map<String, Object> params){

        model.addAttribute("categoryId", params.get("category"));
        return "camtic/news/write";
    }

    /**
     * 게시글 수정 페이지
     * */
    @RequestMapping("/camtic/news/register.do")
    public String noticeRegister(Model model, HttpServletRequest request, @RequestParam Map<String, Object> params){
        Map<String, Object> map = boardService.selectBoard(params);

        model.addAttribute("categoryId", params.get("category"));
        model.addAttribute("map", map);
        return "camtic/news/register";
    }

    /**
     * 게시글 수정 페이지(파일 불러오기)
     * */
    @RequestMapping("/camtic/news/getFileListInfo.do")
    public String getFileListInfo(Model model, HttpServletRequest request, @RequestParam Map<String, Object> params){

        List<Map<String, Object>> fileList = boardService.selectBoardFile(params);
        model.addAttribute("fileMap", fileList);
        return "jsonView";
    }

    /**
     * 게시글 작성
     * */
    @RequestMapping("/camtic/news/insNotice.do")
    public String insNotice(Model model, @RequestParam Map<String, Object> params, MultipartHttpServletRequest request){
        MultipartFile[] file = request.getFiles("boardFile").toArray(new MultipartFile[0]);
        //MultipartFile oneFile = request.getFile("boardFile");
        boardService.insertBoard(params, file, SERVER_DIR, BASE_DIR);

        model.addAttribute("rs", "sc");
        return "jsonView";
    }

    /**
     * 게시글 수정
     * */
    @RequestMapping("/camtic/news/updNotice.do")
    public String updNotice(Model model, @RequestParam Map<String, Object> params, MultipartHttpServletRequest request){
        MultipartFile[] file = request.getFiles("boardFile").toArray(new MultipartFile[0]);
        boardService.updateBoard(params, file, SERVER_DIR, BASE_DIR);

        model.addAttribute("rs", "sc");
        return "jsonView";
    }

    /**
     * 게시글 삭제
     * */
    @RequestMapping("/camtic/news/deleteBoard.do")
    public String delNotice(Model model, @RequestParam Map<String, Object> params){
        boardService.deleteBoard(params);

        model.addAttribute("rs", "sc");
        return "jsonView";
    }


    @RequestMapping(value="/ckeditor/fileupload.do", method= RequestMethod.POST)
    public void fileupload(HttpServletRequest request, HttpServletResponse response, MultipartHttpServletRequest multiFile) throws IOException {
        logger.info("---------------- fileupload ----------------");

        PrintWriter pw = null;
        OutputStream os = null;
        MultipartFile file = multiFile.getFile("upload");
        HttpServletRequest servletRequest = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();

        if(file != null) {
            if(file.getSize() > 0 && StringUtils.isNotBlank(file.getName())) {

                if(file.getContentType().toLowerCase().startsWith("image/")) {

                    String path = "";

                    if(servletRequest.getServerName().contains("localhost") || servletRequest.getServerName().contains("127.0.0.1") || servletRequest.getServerName().contains("218.158.231.186")){
                        path = SERVER_DIR + "ckeditor/";
                    }else{
                        path = SERVER_DIR + "ckeditor/";
                    }

                    try {
                        String fileName = file.getOriginalFilename();
                        byte[] bytes = file.getBytes();

                        String filename_ext = fileName.substring(fileName.lastIndexOf(".") + 1);
                        filename_ext = filename_ext.toLowerCase();

                        logger.info("fileName : " + fileName + ", extension : " + filename_ext);

                        String realFilePath = path;

                        logger.info("default path : " + path + " , realFilePath : " + realFilePath);

                        File uploadFile = new File(realFilePath);
                        if(!uploadFile.exists()) {
                            uploadFile.mkdirs();
                        }

                        fileName = UUID.randomUUID().toString() + "." + filename_ext;

                        os = new FileOutputStream(new File(realFilePath + fileName));
                        os.write(bytes);
                        os.flush(); // outputStream 에 저장된 데이터를 전송하고 초기화

                        String callback = request.getParameter("CKEditorFuncNum");
                        logger.info("callback funcNum : " + callback);

                        pw = response.getWriter();
                        String fileUrl = "/ckeditor/imgsubmit.do?fileName=" + fileName;

                        // 업로드시 메시지 출력
                        pw.println("{\"filename\" : \""+fileName+"\", \"uploaded\" : 1, \"url\":\""+fileUrl+"\"}");
                        pw.flush();

                    } catch(IOException e) {
                        e.printStackTrace();
                    } finally {
                        if(os != null) {
                            os.close();
                        }
                        if(pw != null) {
                            pw.close();
                        }
                    }
                }
            }
        }

        return;
    }

    @RequestMapping("/ckeditor/imgsubmit.do")
    public void imgsubmit(@RequestParam(value="fileName") String fileName, HttpServletRequest request, HttpServletResponse response) throws IOException {
        //서버에 저장된 이미지 경로
        String filePath = SERVER_DIR + "ckeditor/" + fileName;
        File imgFile = new File(filePath);

        //사진 이미지 찾지 못하는 경우 예외처리로 빈 이미지 파일을 설정한다.
        if(imgFile.isFile()) {
            byte[] buf = new byte[1024];
            int readByte = 0;
            int length = 0;
            byte[] imgBuf = null;

            FileInputStream fileInputStream = null;
            ByteArrayOutputStream outputStream = null;
            ServletOutputStream out = null;

            try{
                fileInputStream = new FileInputStream(imgFile);
                outputStream = new ByteArrayOutputStream();
                out = response.getOutputStream();

                while((readByte = fileInputStream.read(buf)) != -1){
                    outputStream.write(buf, 0, readByte);
                }

                imgBuf = outputStream.toByteArray();
                length = imgBuf.length;
                out.write(imgBuf, 0, length);
                out.flush();

            } catch(IOException e){
                logger.info(e.getMessage());
            } finally {
                outputStream.close();
                fileInputStream.close();
                out.close();
            }
        }

    }

    /**
     * 멀티미디어 게시글 작성 페이지
     * */
    @RequestMapping("/camtic/pr/pr_write.do")
    public String prBoardWrite(Model model, @RequestParam Map<String, Object> params){

        model.addAttribute("categoryId", params.get("category"));
        return "camtic/pr/pr_write";
    }

    /**
     * 뉴스레터 게시글 작성 페이지
     * */
    @RequestMapping("/camtic/pr/news_write.do")
    public String bsnsWrite(Model model, @RequestParam Map<String, Object> params){

        model.addAttribute("categoryId", params.get("category"));
        return "camtic/pr/news_write";
    }

    /**
     * 멀티미디어 게시글 수정 페이지
     * */
    @RequestMapping("/camtic/pr/pr_register.do")
    public String prBoardRegister(Model model, HttpServletRequest request, @RequestParam Map<String, Object> params){
        Map<String, Object> map = boardService.selectBoard(params);

        model.addAttribute("categoryId", params.get("category"));
        model.addAttribute("map", map);
        return "camtic/pr/pr_register";
    }

    /**
     * 멀티미디어 게시글 상세보기 페이지
     * */
    @RequestMapping("/camtic/pr/pr_view.do")
    public String prBoardView(Model model, HttpServletRequest request, @RequestParam Map<String, Object> params){
        boardService.setBoardArticleViewCount(params);

        Map<String, Object> map = boardService.selectBoard(params);
        List<Map<String, Object>> fileList = boardService.selectBoardFile(params);
        model.addAttribute("categoryId", params.get("category"));
        model.addAttribute("map", map);
        model.addAttribute("fileMap", fileList);
        return "camtic/pr/pr_view";
    }

    /**
     * 뉴스레터 게시판 등록
     * */
    @RequestMapping("/camtic/news/insNews.do")
    public String insNews(Model model, @RequestParam Map<String, Object> params, MultipartHttpServletRequest request){
        MultipartFile[] file = request.getFiles("boardFile").toArray(new MultipartFile[0]);
        //MultipartFile oneFile = request.getFile("boardFile");
        boardService.insNews(params, file, SERVER_DIR, BASE_DIR);

        model.addAttribute("rs", "sc");
        return "jsonView";
    }
    /**
     * 뉴스레터 게시글 수정 페이지
     * */
    @RequestMapping("/camtic/pr/news_register.do")
    public String newsBoardRegister(Model model, HttpServletRequest request, @RequestParam Map<String, Object> params){

        Map<String, Object> map = boardService.selectBoard(params);
        List<Map<String, Object>> linkInfo = boardService.selectNewsBoard(params);

        Map<String, Object> firstLinkInfo = linkInfo.get(0);

        model.addAttribute("categoryId", params.get("category"));
        model.addAttribute("map", map)
             .addAttribute("firstLinkInfo", firstLinkInfo);
        return "camtic/pr/news_register";
    }

    /**
     * 뉴스레터 수정 페이지 리턴데이터
     * */
    @RequestMapping("/camtic/pr/getRetrunNewsData.do")
    public String getRetrunNewsData(Model model, HttpServletRequest request, @RequestParam Map<String, Object> params){

        List<Map<String, Object>> linkInfo = boardService.selectNewsBoard(params);
        model.addAttribute("list", linkInfo);
        return "jsonView";
    }

    /**
     * 뉴스레터 게시글 상세보기 데이터
     * */
    @RequestMapping("/camtic/pr/news_view.do")
    public String newsView(Model model, HttpServletRequest request, @RequestParam Map<String, Object> params){
        boardService.setBoardArticleViewCount(params);

        model.addAttribute("map", boardService.selectNewsView(params));
        return "jsonView";
    }

    /**
     * 뉴스레터 팝업 데이터
     * */
    @RequestMapping("/newsPopup.do")
    public String newsPopup(Model model, HttpServletRequest request, @RequestParam Map<String, Object> params){


        model.addAttribute("map", boardService.selectNewsPop(params));
        return "camtic/pr/popup/newsPop";
    }

    /**
     * 뉴스레터 구독신청 작성 페이지
     * */
    @RequestMapping("/camtic/pr/news_subscribe.do")
    public String newsSubscribe(Model model, @RequestParam Map<String, Object> params){

        model.addAttribute("categoryId", params.get("category"));
        return "camtic/pr/subscribe_write";
    }
    /**
     * 뉴스레터 구독현황 페이지
     * */
    @RequestMapping("/camtic/pr/news_subscribeList.do")
    public String newsSubscribeList(Model model, @RequestParam Map<String, Object> params){

        model.addAttribute("categoryId", params.get("category"));
        return "camtic/pr/subscribe_list";
    }

    /**
     * 뉴스레터 구독현황 List
     * */
    @RequestMapping("/board/getNewsSubscribeList.do")
    public String getNewsSubscribeList(@RequestParam Map<String, Object> param, ArticlePage articlePage, HttpServletRequest request, Model model){

        int recordSize = Integer.parseInt(String.valueOf(param.get("recordSize")));

        articlePage.setRecordSize(recordSize);

        PagingResponse<PostResponse> response = boardService.getNewsSubscribeList(articlePage);

        model.addAttribute("boardArticleList", response);

        model.addAttribute("pagination", articlePage.getPagination());
        model.addAttribute("page", articlePage.getPage());
        /*model.addAttribute("boardCnt", boardService.selectBoardListCnt(articlePage));*/
        return "jsonView";
    }

    /**
     * 뉴스레터 구독 신청 데이터 체크
     * */
    @RequestMapping("/camtic/news/getSubscribeChk.do")
    public String getSubscribeChk(Model model, @RequestParam Map<String, Object> param){

        model.addAttribute("map", boardService.getSubscribeChk(param));
        return "jsonView";
    }

    /**
     * 뉴스레터 구독 신청 취소
     * */
    @RequestMapping("/camtic/news/getSubscribeCancle.do")
    public String getSubscribeCancle(Model model, @RequestParam Map<String, Object> param){

        Map<String, Object> map = boardService.getSubscribeChk(param);

        String processCode = "";
        int dataChk = Integer.parseInt(String.valueOf(map.get("chk")));

        if(dataChk == 1){
            boardService.cancleSubscribe(param);
            processCode = "SUCCESS";
        }else{
            processCode = "FAIL";
        }

        model.addAttribute("processCode", processCode);
        return "jsonView";
    }

    /**
     * 뉴스레터 구독 게시글 작성
     * */
    @RequestMapping("/camtic/news/insSubscribe.do")
    public String insSubscribe(Model model,@RequestParam Map<String, Object> params){
        boardService.insSubscribe(params);

        model.addAttribute("rs", "sc");
        return "jsonView";
    }

    /**
     * 이전 소식지 페이지
     * */
    @RequestMapping("/camtic/pr/letterListOld.do")
    public String letterListOld(Model model, @RequestParam Map<String, Object> params){

        model.addAttribute("categoryId", params.get("category"));
        return "camtic/pr/letterListOld";
    }

    /**
     * 이전 소식지 년도별 데이터 조회
     * */
    @RequestMapping("/board/getLetterListOld")
    public String getLetterListOld(@RequestParam Map<String, Object> params, Model model, String year){

        List<Map<String, Object>> list = boardService.getLetterListOld(params);

        params.put("year", year);
        model.addAttribute("list", list);
        model.addAttribute("categoryId", params.get("category"));
        return "jsonView";
    }
}
