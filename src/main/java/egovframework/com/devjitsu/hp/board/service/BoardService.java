package egovframework.com.devjitsu.hp.board.service;

import egovframework.com.devjitsu.hp.board.util.ArticlePage;
import egovframework.com.devjitsu.hp.board.util.PagingResponse;
import egovframework.com.devjitsu.hp.board.util.PostResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface BoardService {

    /** 게시글 전체조회 */
    PagingResponse<PostResponse> selectBoardList(ArticlePage params);
    PagingResponse<PostResponse> getNewsSubscribeList(ArticlePage params);

    List<Map<String, Object>> selectMainList(Map<String, Object> param);
    List<Map<String, Object>> selectBsnsMainList(Map<String, Object> param);

    Object selectBoardListCnt(ArticlePage params);

    /** 게시글 상세조회 */
    Map<String, Object> selectBoard(Map<String, Object> params);

    /** 뉴스레터 게시글 상세조회 */
    List<Map<String, Object>> selectNewsBoard(Map<String, Object> params);

    /** 게시글 상세조회(파일) */
    List<Map<String, Object>> selectBoardFile(Map<String, Object> params);

    /** 게시글 작성 */
    void insertBoard(Map<String, Object> params, MultipartFile[] file, String serverDir, String baseDir);

    /** 뉴스레터 게시글 작성 */
    void insNews(Map<String, Object> params, MultipartFile[] file, String serverDir, String baseDir);

    /** 게시글 수정 */
    void updateBoard(Map<String, Object> params, MultipartFile[] file, String serverDir, String baseDir);

    /** 게시글 삭제 */
    void deleteBoard(Map<String, Object> params);

    /** 게시글 조회수 증가 */
    void setBoardArticleViewCount(Map<String, Object> params);
    /** 뉴스레터 팝업조회 */
    Map<String, Object> selectNewsPop(Map<String, Object> params);
    /** 뉴스레터 게시판 상세보기*/
    Map<String, Object> selectNewsView(Map<String, Object> params);
    Map<String, Object> getSubscribeChk(Map<String, Object> params);

    void insSubscribe(Map<String, Object> params);
    void cancleSubscribe(Map<String, Object> param);

    /** 이전 소식지 년도별 데이터 조회 */
    List<Map<String, Object>>getLetterListOld(Map<String, Object> params);
    /** 캠틱 메인홈페이지 캠틱포커스 데이터 연동 */
    List<Map<String, Object>>getFocusList(Map<String, Object> param);

    /** 캠틱 메인홈페이지 채용공고 연동 */
    List<Map<String, Object>> getMainRecruitList(Map<String, Object> param);

    /** 캠틱 메인홈페이지 SNS 게시판 */
    List<Map<String, Object>> getSnsPosts(Map<String, Object> param);

    /** 캠틱 채용공고 게시판 리스트 */
    PagingResponse<PostResponse> getRecruitmentList(ArticlePage params);

    /** 멀티 첨부파일 다운 리스트 조회*/
    List<Map<String, Object>> getArticleFileList(Map<String, Object> params);

    /** 주요알림서비스 리스트 조회*/
    List<Map<String, Object>> selectAlarmList(Map<String, Object> param);

    /** 나의 입사지원 데이터 조회 */
    List<Map<String, Object>>getMyRecruitList(Map<String, Object> params);

    /** 나의 입사지원 취소 */
    void cancelMyRecruit(Map<String, Object> params);

}
