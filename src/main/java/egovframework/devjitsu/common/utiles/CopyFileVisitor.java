package egovframework.devjitsu.common.utiles;

import java.io.IOException;
import java.nio.file.*;
import java.nio.file.attribute.BasicFileAttributes;

public class CopyFileVisitor extends SimpleFileVisitor<Path> {

    private Path sourcePath;
    private Path targetPath;

    public CopyFileVisitor(Path sourcePath, Path targetPath) {
        this.sourcePath = sourcePath;
        this.targetPath = targetPath;
    }

    @Override
    public FileVisitResult preVisitDirectory(Path dir, BasicFileAttributes attrs) throws IOException {
        Path newDirectory = targetPath.resolve(sourcePath.relativize(dir));
        Files.createDirectories(newDirectory);
        return FileVisitResult.CONTINUE;
    }

    @Override
    public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
        Path newFile = targetPath.resolve(sourcePath.relativize(file));
        Files.copy(file, newFile, StandardCopyOption.REPLACE_EXISTING);
        return FileVisitResult.CONTINUE;
    }

}
